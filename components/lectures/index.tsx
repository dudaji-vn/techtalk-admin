import { ROUTE } from "@/const/path";
import { formatDate } from "@/utils/date";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import Typography from "../typo";
import DotIcon from "../icons/dot-icon";
import LectureHeader from "../lecture-header";

interface ILecturePageProps {
  data: GridRowsProp;
}
export default function Lectures(props: ILecturePageProps) {
  const { data } = props;

  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: "lectureName",
      headerName: "Lecture name",
      type: "string",
      align: "left",
      headerAlign: "left",
      minWidth: 300,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <DotIcon status={params.value} />
          <Typography type="small">{params.value}</Typography>
        </div>
      ),
    },
    {
      field: "created",
      headerName: "Created",
      minWidth: 300,
      renderCell: (params) => <Typography type="small">{formatDate(params.value)}</Typography>,
    },
    {
      field: "updated",
      headerName: "Updated",
      minWidth: 300,
      renderCell: (params) => <Typography type="small">{formatDate(params.value)}</Typography>,
    },
    {
      field: "published",
      headerName: "Published",
      minWidth: 300,
      renderCell: (params) => <Typography type="small">{params.value ? formatDate(params.value) : "Not published"}</Typography>,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "16px",
          height: "calc(100vh - 200px)",
        }}
      >
        <div className="mb-4">
          <LectureHeader />
        </div>
        <DataGrid
          onRowClick={(item) => {
            router.push(`${ROUTE.lectures}/${item.id}`);
          }}
          rowHeight={60}
          getRowId={(item) => item.lectureId}
          key={"lectureId"}
          rows={data}
          columns={columns}
        />
      </Box>
    </>
  );
}
