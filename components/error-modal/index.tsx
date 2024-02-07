import Close from "@mui/icons-material/Close";
import Modal, { IModalProps } from "../modal";
import Typography from "../typo";
interface IImportExcelModalProps extends IModalProps {
  onConfirm?: () => void;
  error: {
    errorItems: string[];
    message: string;
  };
}

const ErrorModal = (props: IImportExcelModalProps) => {
  const { open, onClose, error } = props;
  const { errorItems, message } = error;

  return (
    <Modal modalStyle={{ width: "400px" }} open={open} onClose={onClose}>
      <div className="flex gap-4 justify-between items-center ">
        <Typography type="semi-bold">Error</Typography>
        <div className="cursor-pointer" onClick={onClose}>
          <Close />
        </div>
      </div>
      <div className="pt-2 pb-12">
        <Typography type="normal" className="text-error mb-4">
          {message}
        </Typography>

        <div className="py-4 px-8 rounded-lg border border-gray50 flex flex-col ">
          {errorItems && (
            <ul className="list-disc">
              {errorItems.map((item) => {
                return <li className="text-error">{item}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
