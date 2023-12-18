import React, { useMemo } from "react";
import Typography from "../Typo";
import TotalLectureIcon from "../Icons/TotalLectureIcon";
import PeopleIcon from "../Icons/PeopleIcon";
import RecordIcon from "../Icons/RecordIcon";
import Loading from "../Loading";
import { Avatar, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useApiLecture } from "../../hooks/api/useApiLecture";
import { useApiDashboard } from "../../hooks/api/useApiDashboard";
import FlagVNIcon from "../Icons/FlagVNIcon";
import FlagKoreaIcon from "../Icons/FlagKoreaIcon";

interface IAnalystItem {
  icon: JSX.Element;
  count: number | JSX.Element;
  text: string;
}
const Dashboard = () => {
  const { analyst, topUserCompleteLectureOfKR, topUserCompleteLectureOfVN, top5Lectures } = useApiDashboard();
  const analystData: IAnalystItem[] = useMemo(
    () => [
      {
        icon: <TotalLectureIcon />,
        count: analyst?.totalLectures ?? <CircularProgress />,
        text: "Total lectures",
      },
      {
        icon: <PeopleIcon />,
        count: analyst?.totalUser ?? <CircularProgress />,
        text: "Total users",
      },
      {
        icon: <RecordIcon />,
        count: analyst?.totalCompletedRecordUser ?? <CircularProgress />,
        text: "Users complete recorded",
      },
    ],
    [analyst]
  );
  const topLectureColumns: GridColDef[] = [
    {
      field: "lectureName",
      headerName: "Lecture name",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "total",
      headerName: "Number of user",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
  ];
  const countryColumns: GridColDef[] = [
    {
      field: "country",
      headerName: "Country",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            {params.value === "Viet Nam" ? <FlagVNIcon /> : <FlagKoreaIcon />}
            <p>{params.value}</p>
          </div>
        );
      },
    },
    {
      field: "numberOfUser",
      headerName: "Number of user",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
  ];
  const userCompletedRecordColumns: GridColDef[] = [
    {
      field: "nickName",
      headerName: "Nick name",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar>{params.value.slice(0, 1)}</Avatar>
            <div>{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "nativeLanguage",
      headerName: "Native language",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return <div>{params.value === "vn" ? "Vietnamese" : "Korean"}</div>;
      },
    },
  ];

  const countryRows = [
    {
      country: "vn",
      numberOfUser: 50,
    },
    {
      country: "kr",
      numberOfUser: 40,
    },
  ];
  const userCompletedRecordRows = [
    {
      nickname: "Linh",
    },
  ];

  console.log(analyst);
  return (
    <div className="">
      <div className="p-4 border border-gray50">
        <Typography type="semi-bold">Dashboard</Typography>
      </div>
      <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {analystData.map((item, index) => {
            return (
              <div className="p-4 bg-white rounded flex flex-col gap-4">
                {item.icon}
                <Typography type="3xl">{item.count}</Typography>
                <Typography type="normal">{item.text}</Typography>
              </div>
            );
          })}
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 ">
          <div>
            <div className="rounded p-4 bg-white border-t border-r border-l border-gray50">
              <Typography type="semi-bold">Top 5 lecture completed recorded</Typography>
            </div>
            <DataGrid
              className="bg-white"
              rowHeight={60}
              getRowId={(item) => item?.lectureName}
              columns={topLectureColumns}
              rows={top5Lectures ?? []}
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnMenu
              hideFooterPagination={true}
              hideFooterSelectedRowCount
              hideFooter
              autoHeight
            />
          </div>
          <div>
            <div className="rounded p-4 bg-white border-t border-r border-l border-gray50 ">
              <Typography type="semi-bold">Session by country</Typography>
            </div>
            <DataGrid
              className="bg-white"
              rowHeight={60}
              getRowId={(item) => item?.country}
              columns={countryColumns}
              rows={[
                {
                  country: "Viet Nam",
                  numberOfUser: analyst?.totalUserVN,
                },
                {
                  country: "Korea",
                  numberOfUser: analyst?.totalUserKR,
                },
              ]}
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnMenu
              hideFooterPagination={true}
              hideFooterSelectedRowCount
              hideFooter
              autoHeight
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="rounded p-4 bg-white border-t border-r border-l border-gray50">
            <Typography type="semi-bold">Top 50 user complete record 10 lecture in Korean</Typography>
          </div>
          <DataGrid
            rows={topUserCompleteLectureOfKR ?? []}
            className="bg-white"
            getRowId={(item) => item?.userId}
            columns={userCompletedRecordColumns}
            disableRowSelectionOnClick
            hideFooter
            disableColumnFilter
            disableColumnMenu
            hideFooterPagination={true}
            autoHeight
          />
        </div>
        <div>
          <div className="rounded p-4 bg-white border-t border-r border-l border-gray50">
            <Typography type="semi-bold">Top 50 user complete record 10 lecture in Viet Nam</Typography>
          </div>
          <DataGrid
            className="bg-white"
            getRowId={(item) => item?.userId}
            columns={userCompletedRecordColumns}
            rows={topUserCompleteLectureOfVN ?? []}
            disableRowSelectionOnClick
            hideFooter
            disableColumnFilter
            disableColumnMenu
            hideFooterPagination={true}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
