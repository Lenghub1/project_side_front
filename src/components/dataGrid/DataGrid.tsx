import * as React from "react";
import { DataGrid as DG, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function DataGrid() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 10,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DG
        {...data}
        slots={{ toolbar: GridToolbar }}
        isCellEditable={() => false}
      />
    </div>
  );
}
