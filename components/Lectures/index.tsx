import { IFormLecture } from '@/interfaces/lecture';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import * as React from 'react';
import { useState } from 'react';
import AddOrEditLectureModal from '../AddOrEditLectureModal';
import AddIcon from '../Icons/AddIcon';
import LectureHeader from '../LectureHeader';
import Typography from '../Typo';
import DotIcon from '../Icons/DotIcon';
import { formatDate } from '../../utils/date';
import { useRouter } from 'next/navigation';
import { ROUTE } from '../../const/path';
import { it } from 'node:test';

interface ILecturePageProps {
  data: GridRowsProp;
}
export default function Lectures(props: ILecturePageProps) {
  const { data } = props;
  const [selectedLectureId, setSelectedLectureId] = React.useState<number>(0);
  const [type, setType] = React.useState<'add' | 'edit'>('add');
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenAddModal = () => {
    setType('add');
    setOpenModal(true);
  };
  const handleEditClick = (id: any) => {
    setSelectedLectureId(id);
    setType('edit');
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'lectureName',
      headerName: 'Lecture name',
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      minWidth: 300,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <DotIcon status={params.value} />
          <Typography type="small">{params.value}</Typography>
        </div>
      ),
    },
    {
      field: 'created',
      headerName: 'Created',
      minWidth: 300,
      renderCell: (params) => <Typography type="small">{formatDate(params.value)}</Typography>,
    },
    {
      field: 'updated',
      headerName: 'Updated',
      minWidth: 300,
      renderCell: (params) => <Typography type="small">{formatDate(params.value)}</Typography>,
    },
    {
      field: 'published',
      headerName: 'Published',
      minWidth: 300,
      renderCell: (params) => <Typography type="small">{params.value ? formatDate(params.value) : 'Not published'}</Typography>,
    },
  ];

  return (
    <>
      <AddOrEditLectureModal
        type={type}
        data={type === 'edit' && (data.find((item) => item.lectureId === selectedLectureId) as IFormLecture)}
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      />
      <Box
        sx={{
          width: '100%',
          padding: '16px',
          height: 'calc(100vh - 200px)',
        }}
      >
        <div className="mb-4">
          <LectureHeader />
        </div>
        <DataGrid
          onRowClick={(item) => {
            console.log(item.row);
            router.push(`${ROUTE.lectures}/${item.id}`);
          }}
          rowHeight={60}
          getRowId={(item) => item.lectureId}
          key={'lectureId'}
          rows={data}
          columns={columns}
        />
      </Box>
    </>
  );
}
