import React, { useMemo } from 'react';
import Typography from '../Typo';
import TotalLectureIcon from '../Icons/TotalLectureIcon';
import PeopleIcon from '../Icons/PeopleIcon';
import RecordIcon from '../Icons/RecordIcon';
import Loading from '../Loading';
import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useApiLecture } from '../../hooks/api/useApiLecture';
import { useApiDashboard } from '../../hooks/api/useApiDashboard';

interface IAnalystItem {
  icon: JSX.Element;
  count: number | JSX.Element;
  text: string;
}
const Dashboard = () => {
  const { analyst } = useApiDashboard();
  const analystData: IAnalystItem[] = useMemo(
    () => [
      {
        icon: <TotalLectureIcon />,
        count: analyst?.totalLectures ?? <CircularProgress />,
        text: 'Total lectures',
      },
      {
        icon: <PeopleIcon />,
        count: analyst?.totalUser ?? <CircularProgress />,
        text: 'Total users',
      },
      {
        icon: <RecordIcon />,
        count: analyst?.totalCompletedRecordUser ?? <CircularProgress />,
        text: 'Users complete recorded',
      },
    ],
    [analyst]
  );
  const columns: GridColDef[] = [
    {
      field: 'lectureName',
      headerName: 'Lecture name',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'numberOfUser',
      headerName: 'Number of user',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
  ];
  const countryColumns: GridColDef[] = [
    {
      field: 'country',
      headerName: 'Country',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'numberOfUser',
      headerName: 'Number of user',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
  ];
  const userCompletedRecordColumns: GridColDef[] = [
    {
      field: 'nickname',
      headerName: 'User name',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'nativeLanguage',
      headerName: 'Native language',
      type: 'string',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
  ];

  const rows = [
    {
      lectureName: 'Pattern 1 ',
      numberOfUser: 10,
    },
    {
      lectureName: 'Pattern 2',
      numberOfUser: 20,
    },
  ];
  const countryRows = [
    {
      country: 'vn',
      numberOfUser: 50,
    },
    {
      country: 'kr',
      numberOfUser: 40,
    },
  ];
  const userCompletedRecordRows = [
    {
      nickname: 'Linh',
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
              <Typography type="normal">Top 5 lecture completed recorded</Typography>
            </div>
            <DataGrid
              className="bg-white"
              rowHeight={60}
              getRowId={(item) => item?.lectureName}
              columns={columns}
              rows={rows}
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
            <div className="rounded p-4 bg-white border-t border-r border-l border-gray50">
              <Typography type="normal">Session by country</Typography>
            </div>
            <DataGrid
              className="bg-white"
              rowHeight={60}
              getRowId={(item) => item?.country}
              columns={countryColumns}
              rows={countryRows}
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
        <div>
          <div className="rounded p-4 bg-white border-t border-r border-l border-gray50">
            <Typography type="normal">Top 50 user complete record 10 sentences</Typography>
          </div>
          <DataGrid
            className="bg-white"
            getRowId={(item) => item?.lectureName}
            columns={userCompletedRecordColumns}
            rows={rows}
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
