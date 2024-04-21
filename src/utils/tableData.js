import { DeleteOutlineOutlined } from "@mui/icons-material";
import Util from "./util";
import useExpenses from "../hooks/useExpenses";
import useSave from "../hooks/useSave";
const useTableData = () => {
  const { format_currency } = Util();
  const { deleteExpenses } = useExpenses();
  const { deleteIncome } = useSave();
  // table data for savings
  const savingsColumn = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "source", headerName: "Source", width: 250 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "saved", headerName: "Saved", width: 150 },
    { field: "balance", headerName: "Spendable", width: 100 },
    { field: "createdAt", headerName: "Date", width: 100 },
    {
      field: "",
      headerName: "Action",
      width: "70",
      renderCell: (params) => (
        <>
          <DeleteOutlineOutlined
            onClick={() => {
              if (
                window.confirm(
                  `This operation will cause the deletion of the income amount of ${format_currency(
                    params.row.amount
                  )} tracked on ${
                    params.row.createdAt
                  }. Press "OK" to continue or cancel.`
                )
              ) {
                deleteIncome(params.row.id);
              }
            }}
          />
        </>
      ),
    },
  ];
  // withdrawal history
  const withdrawalsColumn = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "amount", headerName: "Amount", width: 90 },
    { field: "account", headerName: "Account", width: 220 },
    { field: "createdAt", headerName: "Date", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
  ];
  const loansColumn = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "amount", headerName: "Amount", width: 90 },
    { field: "reason", headerName: "Reason", width: 220 },
    { field: "borrowed_from", headerName: "Borrowed from", width: 220 },
    { field: "createdAt", headerName: "Date", width: 100 },
    { field: "repayment_date", headerName: "Repayment Date", width: 100 },
  ];
  const expenseColumn = [
    { field: "id", headerName: "ID", width: "80" },
    { field: "item", headerName: "Item", width: "300" },
    { field: "category", headerName: "Category", width: "150" },
    { field: "quantity", headerName: "Qty", width: "50" },
    { field: "unit_price", headerName: "Unit Price", width: "150" },
    { field: "total_cost", headerName: "Total Price", width: "150" },
    { field: "created_at", headerName: "Date", width: "150" },
    {
      field: "",
      headerName: "Action",
      width: "70",
      renderCell: (params) => (
        <>
          <DeleteOutlineOutlined
            onClick={() => {
              if (
                window.confirm(
                  `This operation will cause the deletion of the expenses on ${
                    params.row.item
                  } purchased on ${
                    params.row.created_at
                  } at a total price of ${format_currency(
                    params.row.total_cost
                  )} for ${
                    params.row.quantity
                  } units. Press "OK" to continue or cancel.`
                )
              ) {
                // alert("Good");
                deleteExpenses(params.row.id);
              }
            }}
          />
        </>
      ),
    },
  ];
  return { savingsColumn, loansColumn, expenseColumn, withdrawalsColumn };
};
export default useTableData;
