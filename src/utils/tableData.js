// table data for savings
export const savingsColumn = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "source", headerName: "Source", width: 250 },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "saved", headerName: "Saved", width: 150 },
  { field: "balance", headerName: "Balance", width: 100 },
  { field: "createdAt", headerName: "Date", width: 100 },
];
export const loansColumn = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "amount", headerName: "Amount", width: 90 },
  { field: "reason", headerName: "Reason", width: 220 },
  { field: "borrowed_from", headerName: "Borrowed from", width: 220 },
  { field: "createdAt", headerName: "Date", width: 100 },
  { field: "repayment_date", headerName: "Repayment Date", width: 100 },
];
export const expenseColumn = [
  { field: "id", headerName: "ID", width: "50" },
  { field: "item", headerName: "Item", width: "250" },
  { field: "category", headerName: "Category", width: "250" },
  { field: "quantity", headerName: "Qty", width: "50" },
  { field: "unit_price", headerName: "Unit Price", width: "150" },
  { field: "total_cost", headerName: "Total Price", width: "150" },
  { field: "created_at", headerName: "Date", width: "150" },
];
