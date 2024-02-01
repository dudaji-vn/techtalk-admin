import { formateDateWithoutTime } from "@/utils/date";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Link from "next/link";
import { useMemo } from "react";
import ShareIcon from "../Icons/ShareIcon";

interface IUserCertificateTableProps {
  data: GridRowsProp;
}
export default function CertificatesTable(props: IUserCertificateTableProps) {
  const data = useMemo(() => props.data, [props.data]);

  const columns: GridColDef[] = [
    {
      field: "ranking",
      headerName: "Order",
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nickName",
      headerName: "Full name",
      flex: 1.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "certificateName",
      headerName: "Certificate name",
      type: "string",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "percent",
      headerName: "Highest score %",
      type: "string",
      minWidth: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "completedAt",
      headerName: "Completed at",
      type: "string",
      flex: 0.7,
      minWidth: 150,
      renderCell: (params) => {
        return <div>{formateDateWithoutTime(params.value)}</div>;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "slug",
      headerName: "View certificate",
      type: "string",
      renderCell: (params) => {
        return (
          <Link href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/TechTalk-Certificate/${params.value}`} target="_blank">
            <ShareIcon />
          </Link>
        );
      },
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 200px)",
        overflow: "auto",
      }}
    >
      <DataGrid
        autoHeight
        slots={{
          // noRowsOverlay: Loading,
          loadingOverlay: CircularProgress,
        }}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            background: "#F8FAFC",
            borderRight: "1px solid #ccc",
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #ccc",
          },
        }}
        getRowId={(item) => item.slug}
        rows={data}
        columns={columns}
      />
    </Box>
  );
}
