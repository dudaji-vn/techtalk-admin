import { IFormLectureAndVocabulary, ILectureItem } from "@/interfaces/lecture";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Control, FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IFormVocabulary, IVocabulariesByLectureResponse } from "@/interfaces/vocabulary";
import FileUpload from "../FileUpload";
import DeleteIcon from "../Icons/DeleteIcon";
import InputController from "../InputController";
import Loading from "../Loading";

interface ILectureContentProps {
  type: "create" | "edit";
  lecture: ILectureItem;
  vocabularies: IVocabulariesByLectureResponse[];
  control: Control<IFormLectureAndVocabulary, any>;
  watch: UseFormWatch<IFormLectureAndVocabulary>;
  errors?: FieldErrors<IFormLectureAndVocabulary>;
  setValue: UseFormSetValue<IFormLectureAndVocabulary>;
  getValues: UseFormGetValues<IFormLectureAndVocabulary>;
  editable: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const LectureContent = (props: ILectureContentProps) => {
  const photoRef = useRef<HTMLInputElement>(null);
  const { vocabularies, control, watch, errors, setValue, lecture, type, getValues, setDisabled, editable } = props;

  const columns: GridColDef[] = [
    {
      field: "numberOrder",
      headerName: "Order",
      minWidth: 50,
      // editable: editable,
    },

    {
      field: "titleDisplay",
      headerName: "Word/ Expression",
      minWidth: 220,
      editable: editable,
    },
    {
      field: "phonetic",
      headerName: "Phonetic",
      type: "string",
      minWidth: 270,
      align: "left",
      headerAlign: "left",
      editable: editable,
    },
    {
      field: "textKR",
      headerName: "Korean meaning",
      type: "string",
      minWidth: 400,
      align: "left",
      headerAlign: "left",
      editable: editable,
    },
    {
      field: "textVN",
      headerName: "Vietnamese meaning",
      type: "string",
      minWidth: 400,
      align: "left",
      headerAlign: "left",
      editable: editable,
    },
  ];

  const initRows: IVocabulariesByLectureResponse[] = Array.from(Array(10).keys()).map((item) => {
    return {
      numberOrder: item + 1,
      phonetic: "",
      textKR: "",
      textVN: "",
      titleDisplay: "",
      vocabularyId: "",
    };
  });
  const fillFullVocabularies = useMemo(() => {
    //if (!vocabularies) return [];
    if (vocabularies.length > 10) return vocabularies;
    let newVocabularies = [];
    for (let i = 0; i < 10; i++) {
      newVocabularies[i] = vocabularies[i]
        ? {
            ...vocabularies[i],
            numberOrder: i + 1,
          }
        : {
            numberOrder: i + 1,
            phonetic: "",
            textKR: "",
            textVN: "",
            titleDisplay: "",
            vocabularyId: "",
          };
    }

    return newVocabularies;
  }, [vocabularies]);
  useEffect(() => {
    setValue("lectureName", type === "create" ? "" : lecture.lectureName);
    setValue("imgSrc", lecture.imgSrc);
  }, [lecture]);
  useEffect(() => {
    // debugger;
    setValue("listVocabulary", type === "create" ? initRows : fillFullVocabularies);
  }, [fillFullVocabularies]);
  const rows = useMemo<IVocabulariesByLectureResponse[]>(() => {
    return type === "create"
      ? initRows.sort((a, b) => a.numberOrder - b.numberOrder)
      : fillFullVocabularies.sort((a, b) => a.numberOrder - b.numberOrder);
  }, [vocabularies, lecture.lectureId]);

  return (
    <div className="">
      <div className="p-4">
        <InputController className="w-full" label="Lecture name" name="lectureName" control={control} />
        <div className="relative w-100 my-6">
          <FileUpload
            label="Attach image cover"
            ref={photoRef}
            name={"imgSrc"}
            control={control}
            error={errors?.imgSrc?.message}
          />
          <div className="absolute bottom-0 -right-6">
            {watch("imgSrc") && (
              <div className="relative">
                <img className="h-12 object-cover" src={watch("imgSrc")} alt="" />
                <button
                  onClick={() => {
                    setValue("imgSrc", "");
                    if (photoRef.current) {
                      photoRef.current.value = "";
                    }
                  }}
                  className="absolute -top-4 -right-4 bg-white h-4 w-4 flex items-center rounded-full "
                >
                  <CloseIcon style={{ width: "100%", height: "100%" }} fontSize={"small"} />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <Button icon={<AddIcon color="#7F56D9" />}>Add sentence</Button>
          <Typography type="small">10/10 sentences left</Typography>
        </div> */}
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 400px)",
            overflow: "auto",
          }}
        >
          <DataGrid
            slots={{
              noRowsOverlay: Loading,
              loadingOverlay: CircularProgress,
            }}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                borderRight: "1px solid #ccc",
              },
              "& .MuiDataGrid-cell": {
                borderRight: "1px solid #ccc",
              },
            }}
            rowHeight={60}
            getRowId={(item) => item?.numberOrder}
            columns={columns}
            onProcessRowUpdateError={(err) => {
              console.log("process");
              console.log(err);
            }}
            onStateChange={(data, event) => {
              const vocabularies = Object.values(data.editRows).map((item: any) => {
                return {
                  titleDisplay: item.titleDisplay.value,
                  phonetic: item.phonetic.value,
                  textKR: item.textKR.value,
                  textVN: item.textVN.value,
                  numberOrder: item.numberOrder,
                };
              }) as IVocabulariesByLectureResponse[];

              if (!vocabularies || vocabularies.length === 0 || !getValues("lectureName") || !getValues("imgSrc")) {
                setDisabled(true);
                return;
              }
              let vocabulariesFilter = vocabularies.filter(
                (item) => item.phonetic || item.textKR || item.textVN || item.titleDisplay
              );
              if (vocabulariesFilter.length === 0) {
                setDisabled(true);
                return;
              }

              const isDisabled = !vocabulariesFilter.every(
                (item) => item.phonetic && item.textKR && item.textVN && item.titleDisplay
              );
              // setValue('listVocabulary', vocabularies);
              setDisabled(isDisabled);
            }}
            processRowUpdate={(newData, oldData) => {
              let newVocabularies = getValues("listVocabulary");
              newVocabularies[newData.numberOrder - 1] = { ...newData };
              setValue("listVocabulary", newVocabularies);
            }}
            rows={rows}
            disableRowSelectionOnClick
            hideFooterPagination={true}
            editMode="row"
          />
        </Box>
      </div>
    </div>
  );
};

export default LectureContent;
