import { useApiLecture } from "@/hooks/api/use-api-lecture";
import { IChangeStatusLectureRequest } from "@/interfaces/lecture.interface";
import Close from "@mui/icons-material/Close";
import Button from "../button";
import Modal, { IModalProps } from "../modal";
import Typography from "../typo";

interface IUnPublishModalProps extends IModalProps {
  lectureId: string;
}
const UnPublishModal = (props: IUnPublishModalProps) => {
  const { open, onClose, lectureId } = props;
  const { changeStatusLecture } = useApiLecture();
  const handleUnPublish = () => {
    if (!lectureId) {
      return;
    }
    const payload: IChangeStatusLectureRequest = {
      lectureId: lectureId,
      status: "Draft",
    };
    changeStatusLecture(payload);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex gap-4 justify-between items-center ">
        <Typography type="semi-bold">Unpublish</Typography>
        <div className="cursor-pointer" onClick={onClose}>
          <Close />
        </div>
      </div>
      <div className="pt-6 pb-12">
        <Typography type="normal">
          Unpublishing this lecture will immediately <span className="text-warning">remove it from your live site</span> and
          change its status to Draft. Are you sure you want to go ahead?
        </Typography>
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={handleUnPublish} type="button" styles="primary">
          Yes, Unpublished
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default UnPublishModal;
