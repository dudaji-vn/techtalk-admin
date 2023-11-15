import Box from "@mui/material/Box";
import ModalLib from "@mui/material/Modal";
import React, { ReactNode } from "react";

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  modalStyle?: {
    [key: string]: any;
  };
}

const Modal: React.FC<IModalProps> = ({
  open,
  onClose,
  children,
  modalStyle,
}) => {
  const defaultModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <ModalLib
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle ?? defaultModalStyle}>{children}</Box>
    </ModalLib>
  );
};

export default Modal;
