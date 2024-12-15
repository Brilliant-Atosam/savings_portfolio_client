import "../styles/expenses.css";
import Topbar from "../components/Topbar";
import { GiExpense } from "react-icons/gi";
import Util from "../utils/util";
import Table from "../components/Table";
import useTableData from "../utils/tableData";
import ExpensesDialog from "../components/Expenses";
import useExpenses from "../hooks/useExpenses";
import AreaChartComponent from "../components/AreaChartComponent";
import { Link } from "react-router-dom";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
import useSettings from "../hooks/useSettings";
import Footer from "../components/Footer";
import Feedback from "../components/Feedback";
const Expenses = () => {
  const { expenseColumn } = useTableData();
  const { loading } = useApp();
  const { categories, format_currency, user, businessExpenseCategories } =
    Util();
  const expensesCategories =
    user?.purpose !== "personal finance"
      ? businessExpenseCategories
      : categories;
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
  const {
    openExpenseDialog,
    toggleExpensesDialog,
    data,
    monthly_expenses_data,
    handleSnackbar,
    snackbar,
    expenses,
    handleExpenses,
    setExpenses,
  } = useExpenses();
  const { total_expenses, total_spendable, spendable_utilization_percentage } =
    useSettings();
  return (
    <div className="main-container">
      <Topbar />
      <ExpensesDialog
        open={openExpenseDialog}
        toggle={toggleExpensesDialog}
        expenses={expenses}
        handleExpenses={() => handleExpenses(expenses)}
        setExpenses={setExpenses}
      />
      <div className="expenses-container">
        <div className="expenses-details-container">
          <div className="expenses-table-container expenses-left">
            <div className="finance-info-container">
              <div className="info-container">
                <span className="finance-info-key">Tot. Spendable</span>
                <span className="finance-info-value">
                  {format_currency(total_spendable)}
                </span>
              </div>
              <div className="info-container">
                <span className="finance-info-key">Tot. Expenses</span>
                <span className="finance-info-value">
                  {format_currency(total_expenses)}
                </span>
              </div>
              <div className="info-container">
                <span className="finance-info-key">SUP</span>
                <span className="finance-info-value">
                  {spendable_utilization_percentage}%
                </span>
              </div>
            </div>
            <h1 className="expenses-heading debt-text">Expenses summary</h1>
            <div className="expenses-categories-container">
              {expensesCategories.map((category, index) => (
                <Link
                  to={`/expenses/details?index=${index}`}
                  className="category"
                  key={index}
                >
                  <category.icon className="cat-icons" />
                  <span className="category-name">{category.title}:</span>
                  <span className="category-value">
                    {format_currency(
                      Number(
                        expensesList
                          .filter((item) =>
                            category?.title
                              .toLocaleLowerCase()
                              .includes(item?.category.toLocaleLowerCase())
                          )
                          ?.reduce((a, b) => a + b.total_cost, 0)
                      )
                    )}
                  </span>
                </Link>
              ))}
            </div>
            <h1 className="expenses-heading debt-text">Expenses history</h1>
            {loading && <CircularProgress />}
            <div className="chart-container">
              <h1 className="debt-text">Expenses chart for categories</h1>
              <div className="chart-container borrowing-chart-container">
                <AreaChartComponent data={data} />
              </div>
            </div>
          </div>
          <div className="expenses-right">
            <div className="chart-container mb20">
              <h1 className="debt-text">Monthly expenses chart</h1>
              <div className="chart-container borrowing-chart-container">
                <AreaChartComponent
                  data={
                    monthly_expenses_data.reduce(
                      (a, b) => a + b.total_expenses,
                      0
                    ) > 0 && monthly_expenses_data
                  }
                />
              </div>
              {monthly_expenses_data.reduce((a, b) => a + b.total_expenses, 0) >
                0 &&
                user?.tier !== "premium" && (
                  <h1 className="no-data-text">
                    This could be your data displayed in the chart above.
                    <a href="/" className="link">
                      Learn more
                    </a>
                  </h1>
                )}
            </div>
            <Table columns={expenseColumn} rows={expensesList} />
          </div>
        </div>
      </div>
      <div className="action-container">
        <div
          className="add-expenses-btn-container"
          onClick={toggleExpensesDialog}
        >
          <GiExpense className="add-expenses-btn" />
        </div>
      </div>
      <Feedback
        snackbar={snackbar}
        toggler={() => handleSnackbar("", "info")}
      />
      <Footer />
    </div>
  );
};

export default Expenses;
