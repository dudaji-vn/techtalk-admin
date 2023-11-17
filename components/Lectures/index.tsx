import { IFormLecture } from "@/interfaces/lecture";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";
import AddOrEditLectureModal from "../AddOrEditLectureModal";
import AddIcon from "../Icons/AddIcon";

interface ILecturePageProps {
  data: GridRowsProp;
}
export default function LecturesPage(props: ILecturePageProps) {
  const { data } = props;
  const [selectedLectureId, setSelectedLectureId] = React.useState<number>(0);
  const [type, setType] = React.useState<"add" | "edit">("add");

  const [openModal, setOpenModal] = useState(false);
  const handleOpenAddModal = () => {
    setType("add");
    setOpenModal(true);
  };
  const handleEditClick = (id: any) => {
    setSelectedLectureId(id);
    setType("edit");
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 200,
      cellClassName: "actions",
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
      field: "imgSrc",
      headerName: "Image",
      type: "number",

      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="w-10 h-10">
          <img src={params.value} />
        </div>
      ),
    },
    {
      field: "lectureName",
      headerName: "Lecture Name",
      minWidth: 300,
    },
  ];

  return (
    <>
      <AddOrEditLectureModal
        type={type}
        data={
          type === "edit" &&
          (data.find(
            (item) => item.lectureId === selectedLectureId
          ) as IFormLecture)
        }
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      />
      <Box
        sx={{
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          height: "calc(100vh - 200px)",
        }}
      >
        <div className="mb-4">
          <button
            onClick={() => handleOpenAddModal()}
            className="bg-primary p-3 rounded-lg "
          >
            <AddIcon />
          </button>
        </div>
        <DataGrid
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
