import Close from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { useUploadLectureAndVocabularyFromCsvMutation } from "@/hooks/api/use-api-file";
import { convertXLSXtoCSV } from "@/utils/excel";
import Button from "../button";
import ErrorModal from "../error-modal";
import DangerDeleteIcon from "../icons/danger-delete-icon";
import UploadIcon from "../icons/upload-icon";
import Modal, { IModalProps } from "../modal";
import Typography from "../typo";
interface IImportExcelModalProps extends IModalProps {
  onConfirm?: () => void;
}

const ImportExcelModal = (props: IImportExcelModalProps) => {
  const { open, onClose } = props;
  const [csvFile, setCsvFile] = useState<Blob>();
  const [fileInfo, setFileInfo] = useState<File>();
  const { isPending, mutate } = useUploadLectureAndVocabularyFromCsvMutation();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<{
    errorItems: string[];
    message: string;
  }>();
  const handleImportTemplate = () => {
    const link = document.createElement("a");
    link.href = "/excel/template.xlsx";
    link.download = "template.xlsx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleOpenFile = () => {
    inputFileRef.current?.click();
  };
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }
    setFileInfo(file);
    const csvData = await convertXLSXtoCSV(file);
    const blob = new Blob([csvData], { type: "text/csv" });
    setCsvFile(blob);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    return;
  };
  const handleUploadFile = () => {
    if (!csvFile) {
      return;
    }
    mutate(
      {
        file: csvFile,
      },
      {
        onSuccess: () => {
          onClose && onClose();
        },
        onError: (err) => {
          const error = err.response?.data.message;
          if (!error) {
            return;
          }
          const arrayError = error.split(";");
          setError({
            message: arrayError[0],
            errorItems: JSON.parse(arrayError[1]),
          });
        },
      }
    );
  };
  const handleDeleteFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setCsvFile(undefined);
    setFileInfo(undefined);
  };
  return (
    <Modal open={open} onClose={onClose}>
      {error && <ErrorModal error={error} open={!!error} onClose={() => setError(undefined)} />}
      <div className={isPending ? "pointer-events-none cursor-not-allowed" : ""}>
        <div className="flex gap-4 justify-between items-center ">
          <Typography type="semi-bold">Import</Typography>
          <div className="cursor-pointer" onClick={onClose}>
            <Close />
          </div>
        </div>
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="pt-6 pb-12">
          <ul className="ml-4 list-disc mb-4">
            <li>
              <Typography type="normal">
                For accurate import results, please use our{" "}
                <span onClick={handleImportTemplate} className="text-primary underline cursor-pointer">
                  Template file here
                </span>{" "}
                and upload when you complete
              </Typography>
            </li>
          </ul>
          <div onClick={handleOpenFile} className="p-8 rounded-lg border border-gray50 flex flex-col items-center cursor-pointer">
            <input
              onChange={handleChangeFile}
              ref={inputFileRef}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              type="file"
              name=""
            />
            <div className="mb-4">
              {isPending ? (
                <CircularProgress />
              ) : (
                <div className="border rounded-lg w-fit border-gray50 p-2">
                  <UploadIcon />
                </div>
              )}
            </div>

            <Typography type="normal" className="mb-2">
              <span onClick={handleImportTemplate} className="text-primary">
                Click to upload
              </span>{" "}
              or drag and drop
            </Typography>
            <Typography type="xs">Support excel</Typography>
          </div>
          {fileInfo && (
            <div className="flex justify-between items-center">
              <div className="mt-4">
                <Typography type="small">{fileInfo.name}</Typography>
                <Typography type="small">{fileInfo.size / 1000} KB</Typography>
              </div>
              <div onClick={handleDeleteFile} className="cursor-pointer">
                <DangerDeleteIcon />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button disabled={!csvFile} onClick={handleUploadFile} type="button" styles="primary">
            Import
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportExcelModal;
