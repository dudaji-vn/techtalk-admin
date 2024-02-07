import React from "react";
import Modal, { IModalProps } from "../modal";
import Typography from "../typo";
import Close from "@mui/icons-material/Close";
import Button from "../button";

interface IPublishModalProps extends IModalProps {
  onConfirm: () => void;
}
const PublishModal = (props: IPublishModalProps) => {
  const { open, onClose, onConfirm } = props;
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex gap-4 justify-between items-center ">
        <Typography type="semi-bold">Publish lecture</Typography>
        <div className="cursor-pointer" onClick={onClose}>
          <Close />
        </div>
      </div>
      <div className="pt-6 pb-12">
        <Typography type="normal">
          Publishing this lecture will immediately <span className="text-warning">show it into your live site</span> and change
          its status to Published. Are you sure you want to go ahead?
        </Typography>
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={onConfirm} type="button" styles="primary">
          Publish now
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default PublishModal;
