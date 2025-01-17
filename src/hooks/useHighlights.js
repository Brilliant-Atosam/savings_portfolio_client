import { useLocation } from "react-router-dom";
import useSave from "./useSave";
import useSettings from "./useSettings";
import useExpenses from "./useExpenses";
import Util from "../utils/util";
const useHighlights = () => {
  const { savingsList, user } = useSave();
  const { expensesList } = useExpenses();
  const {
    average_expenses,
    average_income,
    average_savings,
    peak_savings,
    peak_expenses,
    peak_income,
  } = useSettings();
  const { categories } = Util();
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const query = param.get("month");
  const query_array = query.split("/");
  const last_month_query =
    query_array[0] !== "01"
      ? `${Number(query_array[0]) - 1}/${query_array[1]}`
      : `12/${Number(query_array[1]) - 1}`;
  // last month data
  const income_savings_lm = savingsList?.filter((item) =>
    item?.createdAt?.endsWith(last_month_query)
  );
  const expenses_lm = expensesList?.filter((item) =>
    item.created_at.endsWith(last_month_query)
  );
  const total_income_lm = income_savings_lm?.reduce((a, b) => a + b.amount, 0);
  const total_savings_lm = income_savings_lm?.reduce((a, b) => a + b.saved, 0);
  // const total_spendable_lm = income_savings_lm - total_savings_lm;
  const total_expenses_lm = expenses_lm?.reduce((a, b) => a + b.total_cost, 0);
  // this month data
  const income_savings = savingsList?.filter((item) =>
    item.createdAt.endsWith(query)
  );
  const expenses = expensesList?.filter((item) =>
    item.created_at.endsWith(query)
  );

  const total_income = income_savings
    ?.reduce((a, b) => a + b.amount, 0)
    .toFixed(2);
  const total_savings = income_savings
    ?.reduce((a, b) => a + b.saved, 0)
    .toFixed(2);
  const total_spendable = (total_income - total_savings).toFixed(2);
  const total_expenses = expenses
    ?.reduce((a, b) => a + b.total_cost, 0)
    .toFixed(2);
  const monthly_data = {
    income_c2a_p: Number(
      ((total_income - average_income) / average_income) * 100
    ).toFixed(2),

    income_c2a: (total_income - average_income).toFixed(2),
    expenses_c2a_p: Number(
      (((total_expenses - average_expenses) / average_expenses) * 100).toFixed(
        2
      )
    ),
    expenses_c2a: (total_expenses - average_expenses).toFixed(2),
    savings_c2a_p: Number(((total_savings / average_savings) * 100).toFixed(2)),

    income_c2lm_p: Number(
      (((total_income - total_income_lm) / total_income_lm) * 100).toFixed(2)
    ),
    income_c2lm: (total_income - total_income_lm).toFixed(2),

    savings_c2lm_p: Number(
      ((total_savings / total_savings_lm) * 100).toFixed(2)
    ),

    expenses_c2lm_p: Number(
      (
        ((total_expenses - total_expenses_lm) / total_expenses_lm) *
        100
      ).toFixed(2)
    ),
    expenses_c2lm: Number((total_expenses - total_expenses_lm).toFixed(2)),
  };
  const income_chart_data = [
    {
      name: "income",
      cur_perf: total_income,
      avg_perf: average_income,
      prev_perf: total_income_lm,
      peak_perf: peak_income.total_income,
    },
  ];
  const savings_chart_data = [
    {
      name: "savings",
      cur_perf: total_savings,
      avg_perf: average_savings,
      prev_perf: total_savings_lm,
      peak_perf: peak_savings[0]?.total_savings,
    },
  ];
  const expenses_chart_data = [
    {
      name: "expenses",
      cur_perf: total_expenses,
      avg_perf: average_expenses,
      prev_perf: total_expenses_lm,
      peak_perf: peak_expenses?.total_expenses,
    },
  ];

  // sources
  const income_chart = () => {
    let data = [];
    user.sources_of_income?.map((source) => {
      let data_object = {
        title: source,
        amount: income_savings
          ?.filter((item) => item.source === source)
          ?.reduce((a, b) => a + b.amount, 0),
      };
      data_object.amount > 0 && data.push(data_object);
      return data_object;
    });
    return data;
  };
  let income_sources_chart_data = income_chart();
  let portfolio_from_savings = [];
  income_savings?.map((item) => {
    return portfolio_from_savings.push(...item.details);
  });
  const structuredPortfolio = user?.portfolio?.map((item) => ({
    ...item,
    amount: Number(
      parseFloat(
        portfolio_from_savings
          ?.filter((port) => port.title === item.title)
          .reduce((a, b) => a + b.amount, 0)
      ).toFixed(2)
    ),
  }));
  // expenses categories
  const chart_data_categories = () => {
    let data = [];
    categories?.map((category) => {
      let data_object = {
        title: category.title,
        total_expenses: expenses
          ?.filter((item) =>
            item.category
              .toLocaleLowerCase()
              .includes(category.title.toLocaleLowerCase())
          )
          ?.reduce((a, b) => a + b.total_cost, 0),
        amount: expenses
          ?.filter((item) =>
            item.category
              .toLocaleLowerCase()
              .includes(category.title.toLocaleLowerCase())
          )
          ?.reduce((a, b) => a + b.total_cost, 0),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  const category_chart_data = chart_data_categories();
  return {
    income_savings,
    total_income,
    total_savings,
    expenses,
    total_spendable,
    total_expenses,
    monthly_data,
    income_chart_data,
    savings_chart_data,
    expenses_chart_data,
    income_sources_chart_data,
    structuredPortfolio,
    category_chart_data,
    query_array,
  };
};

export default useHighlights;
