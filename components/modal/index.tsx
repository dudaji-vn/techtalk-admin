import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import ModalLib from '@mui/material/Modal';
import React, { ReactNode } from 'react';

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
  modalStyle?: any;
}

const Modal: React.FC<IModalProps> = ({ open, onClose, children, modalStyle, className }) => {
  const defaultModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    minWidth: 500,
    maxWidth: 600,
    p: 4,
  };
  return (
    <ModalLib className={className} open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={[modalStyle, defaultModalStyle]}>{children}</Box>
    </ModalLib>
  );
};

export default Modal;
