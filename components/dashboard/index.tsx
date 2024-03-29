import { useApiDashboard } from "@/hooks/api/use-api-dashboard";
import { IStatisticsScore, IUserCompleteLecture } from "@/interfaces/dashboard.interface";
import { formatDate } from "@/utils/date";
import { exportToExcel } from "@/utils/excel";
import { Avatar, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import Button from "../button";
import ExportIcon from "../icons/export-icon";
import FlagKoreaIcon from "../icons/flag-korea-icon";
import FlagVNIcon from "../icons/flag-vn-icon";
import PeopleIcon from "../icons/people-icon";
import RecordIcon from "../icons/record-icon";
import SearchIcon from "../icons/search-icon";
import TotalLectureIcon from "../icons/total-lecture-icon";
import Input from "../input";
import Loading from "../loading";
import Typography from "../typo";

interface IAnalystItem {
  icon: JSX.Element;
  count: number | JSX.Element;
  text: string;
}
const Dashboard = () => {
  const { analyst, topUserCompleteLectureOfKR, topUserCompleteLectureOfVN, top5Lectures, statisticsScores } = useApiDashboard();
  const [textSearchVN, setTextSearchVN] = useState("");
  const [textSearchKR, setTextSearchKR] = useState("");
  const filterUser = (users: IUserCompleteLecture[], text: string) => {
    if (!text) {
      return users;
    }
    return users.filter((item) =>
      [item.email, item.index, item.nickName, item.lastCompleted].some((val) => val.toString().includes(text))
    );
  };

  const searchTopUserCompleteLectureOfKR = useMemo(() => {
    if (!topUserCompleteLectureOfKR || topUserCompleteLectureOfKR.length === 0) {
      return [];
    }
    return filterUser(topUserCompleteLectureOfKR, textSearchKR);
  }, [textSearchKR, topUserCompleteLectureOfKR?.length]);
  const searchTopUserCompleteLectureOfVN = useMemo(() => {
    if (!topUserCompleteLectureOfVN || topUserCompleteLectureOfVN.length === 0) {
      return [];
    }
    return filterUser(topUserCompleteLectureOfVN, textSearchVN);
  }, [textSearchVN, topUserCompleteLectureOfVN?.length]);
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
      field: "index",
      headerName: "#",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => params.value + 1,
    },
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
            <Avatar>{params.value?.slice(0, 1)}</Avatar>
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
      field: "lastCompleted",
      headerName: "Completed at",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return <div>{formatDate(params.value)}</div>;
      },
    },
  ];
  const statisticsScoresColumns: GridColDef[] = [
    {
      field: "tryPeopleCount",
      headerName: "Try people count",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "passPeopleCount",
      headerName: "Pass people count",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "passRatio",
      headerName: "Pass ratio",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "sentence",
      headerName: "Sentence",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      minWidth: 550,
    },
    {
      field: "lecture",
      headerName: "Lecture",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      minWidth: 400,
    },
  ];

  const handleExportTop50CSV = (rows: any) => {
    const customSource = rows.map((item: any) => {
      return {
        Order: item.index + 1,
        "Nick name": item.nickName,
        Email: item.email,
        "Completed at": formatDate(item.lastCompleted),
      };
    });
    exportToExcel({
      data: customSource,
      fileName: "data.xlsx",
      colInfo: [
        { width: 12, name: "Order" },
        { width: 30, name: "Nick name" },
        { width: 35, name: "Email" },
        { width: 25, name: "Completed at" },
      ],
    });
  };
  const handleExportStatisticsCSV = (rows: IStatisticsScore[]) => {
    const customSource = rows.map((item) => {
      return {
        "Try people count": item.tryPeopleCount,
        "Pass people count": item.passPeopleCount,
        Sentence: item.sentence,
        Lecture: item.lecture,
      };
    });
    exportToExcel({
      data: customSource,
      fileName: "data.xlsx",
      colInfo: [
        { width: 30, name: "Try people count" },
        { width: 30, name: "Pass people count" },
        { width: 120, name: "Sentence" },
        { width: 50, name: "Lecture" },
      ],
    });
  };
  return (
    <div className="">
      <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {analystData.map((item, index) => {
            return (
              <div className="border border-gray50 p-4 bg-white rounded flex flex-col gap-4">
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
            <Typography className="mb-8 flex" type="semi-bold">
              Top 50
              <span className="px-1">
                <FlagKoreaIcon />
              </span>
              Korean users have completed recording 10 lectures
            </Typography>
            <div className="flex justify-between">
              <Input
                onChange={(e) => {
                  setTextSearchKR(e.target.value);
                }}
                icon={<SearchIcon />}
                placeholder="Search"
              />
              <Button
                onClick={() => handleExportTop50CSV(topUserCompleteLectureOfKR)}
                className="border border-primary"
                variant="contained"
                icon={<ExportIcon />}
              >
                Export CSV
              </Button>
            </div>
          </div>
          <DataGrid
            rows={searchTopUserCompleteLectureOfKR ?? []}
            className="bg-white"
            getRowId={(item) => item?.userId}
            columns={userCompletedRecordColumns}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={[7, 10, 20, 50]}
            autoHeight
          />
        </div>
        <div className="mb-4">
          <div className="rounded p-4 bg-white border-t border-r border-l border-gray50">
            <Typography className="mb-8 flex" type="semi-bold">
              Top 50
              <span className="px-1">
                <FlagVNIcon />
              </span>
              Vietnamese users have completed recording 10 lectures
            </Typography>
            <div className="flex justify-between">
              <Input
                onChange={(e) => {
                  setTextSearchVN(e.target.value);
                }}
                icon={<SearchIcon />}
                placeholder="Search"
              />
              <Button
                onClick={() => handleExportTop50CSV(topUserCompleteLectureOfVN)}
                className="border border-primary"
                variant="contained"
                icon={<ExportIcon />}
              >
                Export CSV
              </Button>
            </div>
          </div>

          <DataGrid
            className="bg-white"
            getRowId={(item) => item?.userId}
            columns={userCompletedRecordColumns}
            rows={searchTopUserCompleteLectureOfVN ?? []}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={[7, 10, 20, 50]}
            autoHeight
            disableRowSelectionOnClick
          />
        </div>
        <div>
          <div className="flex justify-between rounded p-4 bg-white border-t border-r border-l border-gray50">
            <Typography className=" flex" type="semi-bold">
              Statistics of recording results
            </Typography>
            <Button
              onClick={() => statisticsScores && handleExportStatisticsCSV(statisticsScores)}
              className="border border-primary"
              variant="contained"
              icon={<ExportIcon />}
            >
              Export CSV
            </Button>
          </div>

          <DataGrid
            slots={{
              noRowsOverlay: Loading,
              loadingOverlay: CircularProgress,
            }}
            className="bg-white"
            getRowId={(item) => item?.sentence}
            columns={statisticsScoresColumns}
            rows={statisticsScores ?? []}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={[7, 10, 20, 50]}
            autoHeight
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
