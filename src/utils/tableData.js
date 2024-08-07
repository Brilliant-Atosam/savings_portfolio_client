import { DeleteOutlineOutlined } from "@mui/icons-material";
import Util from "./util";
import useExpenses from "../hooks/useExpenses";
import useSave from "../hooks/useSave";
import useBorrow from "../hooks/useBorrow";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
const useTableData = () => {
  const { format_currency } = Util();
  const {
    borrowed_repayment_history,
    lend_repayment_history,
    deleteLentDebt,
    deleteBorrowedDebt,
  } = useBorrow();
  const { deleteExpenses } = useExpenses();
  const { deleteIncome } = useSave();
  const [borrowDetails, setBorrowDetails] = useState({});

  const setBorrowDetailsFunc = (data) =>
    setBorrowDetails((prev) => ({
      ...data,
      settled: data?.repayment_history?.reduce((a, b) => a + b.amount, 0),
      balance: format_currency(
        Number(data?.amount) -
          data?.repayment_history?.reduce((a, b) => a + b.amount, 0)
      ),
    }));
  const [toggleBorrowDetails, setToggleBorrowDetails] = useState(false);
  const borrowDetailsToggler = () => setToggleBorrowDetails((prev) => !prev);
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

  const borrowColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <div className="table-action-container">
          <IoEyeOutline
            className="view-more-icon"
            onClick={() => {
              setBorrowDetailsFunc({ ...params.row, type: "borrow" });
              borrowDetailsToggler();
            }}
          />
          <DeleteOutlineOutlined
            className="view-more-icon"
            onClick={() => {
              if (
                window.confirm(
                  `This operation will delete a debt of ${format_currency(
                    params.row.amount
                  )} borrowed from ${
                    params.row.lender
                  }. Press OK to continue or cancel`
                )
              ) {
                deleteBorrowedDebt(params.row.id);
              }
            }}
          />
        </div>
      ),
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "lender", headerName: "Lender", width: 200 },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "balance",
      headerName: "Balance",
      width: 130,
      renderCell: (params) =>
        params.row.amount -
        borrowed_repayment_history
          ?.filter((item) => item.id === params.row.id)
          ?.reduce((a, b) => a + b.amount, 0),
    },
    {
      field: "settled",
      headerName: "Settled",
      width: 130,
      renderCell: (params) =>
        borrowed_repayment_history
          ?.filter((item) => item.id === params.row.id)
          ?.reduce((a, b) => a + b.amount, 0),
    },
    {
      field: "repayments",
      headerName: "No. of repayments",
      width: 130,
      renderCell: (params) =>
        borrowed_repayment_history?.filter((item) => item.id === params.row.id)
          ?.length,
    },
    { field: "repayment_date", headerName: "Repayment date", width: 200 },
  ];
  const lendColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <div className="table-action-container">
          <IoEyeOutline
            className="view-more-icon"
            onClick={() => {
              setBorrowDetailsFunc({ ...params.row, type: "lend" });
              borrowDetailsToggler();
            }}
          />
          <DeleteOutlineOutlined
            className="view-more-icon"
            onClick={() => {
              if (
                window.confirm(
                  `This operation will delete a debt of ${format_currency(
                    params.row.amount
                  )} lent to ${
                    params.row.lender
                  }. Press OK to continue or cancel`
                )
              ) {
                deleteLentDebt(params.row.id);
              }
            }}
          />
        </div>
      ),
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "borrower", headerName: "Borrower", width: 200 },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "balance",
      headerName: "Balance",
      width: 130,
      renderCell: (params) =>
        params.row.amount -
        lend_repayment_history
          ?.filter((item) => item.id === params.row.id)
          ?.reduce((a, b) => a + b.amount, 0),
    },
    {
      field: "settled",
      headerName: "Settled",
      width: 130,
      renderCell: (params) =>
        lend_repayment_history
          ?.filter((item) => item.id === params.row.id)
          ?.reduce((a, b) => a + b.amount, 0),
    },
    {
      field: "repayments",
      headerName: "No. of repayments",
      width: 130,
      renderCell: (params) =>
        lend_repayment_history?.filter((item) => item.id === params.row.id)
          ?.length,
    },
    { field: "repayment_date", headerName: "Repayment date", width: 200 },
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
  return {
    savingsColumn,
    expenseColumn,
    withdrawalsColumn,
    borrowColumn,
    lendColumn,
    toggleBorrowDetails,
    borrowDetailsToggler,
    borrowDetails,
  };
};
export default useTableData;
