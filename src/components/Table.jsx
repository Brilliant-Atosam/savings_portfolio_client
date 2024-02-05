import React from "react";
import { DataGrid } from "@mui/x-data-grid";
function Table({ columns, rows }) {
  return (
    <div className="table-container">
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 15, 20, 25, 30]}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default Table;
