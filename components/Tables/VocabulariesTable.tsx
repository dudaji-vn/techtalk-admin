import { IVocabulariesByLectureResponse } from '@/interfaces/vocabulary';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import AddOrEditLectureVocabularyModal from '../AddOrEditVocabylaryModal';

interface IVocabulariesTableProps {
  data: GridRowsProp;
}
export default function VocabulariesTable(props: IVocabulariesTableProps) {
  const data = useMemo(() => props.data, [props.data]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedVocabularyId, setSelectedVocabularyId] = useState<string>('');

  const handleEditClick = (id: GridRowId) => {
    setOpenEditModal(true);
    setSelectedVocabularyId(id as string);
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      minWidth: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: 'numberOrder',
      headerName: 'Number Order',
      minWidth: 120,
    },
    {
      field: 'lectureName',
      headerName: 'Lecture Name',
      minWidth: 220,
    },
    {
      field: 'titleDisplay',
      headerName: 'Word/ Expression',
      minWidth: 300,
    },
    {
      field: 'phonetic',
      headerName: 'Phonetic',
      type: 'string',
      minWidth: 300,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'textKR',
      headerName: 'Korean meaning',
      type: 'string',
      minWidth: 300,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'textVN',
      headerName: 'Vietnamese meaning',
      type: 'string',
      minWidth: 300,
      align: 'left',
      headerAlign: 'left',
    },
  ];

  return (
    <>
      {/* <AddOrEditLectureVocabularyModal
        type="edit"
        data={data.find((item) => item.vocabularyId == selectedVocabularyId) as IVocabulariesByLectureResponse}
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
        }}
      /> */}
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 200px)',
          overflow: 'auto',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid key={'voca-table'} getRowId={(item) => item.vocabularyId} rows={data} columns={columns} />
      </Box>
    </>
  );
}
