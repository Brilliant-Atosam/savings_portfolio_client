import React from "react";
import { DataGrid } from "@mui/x-data-grid";
function Table({ columns, rows }) {
  return (
    <div className="table-container">
      <DataGrid
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
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default Table;
