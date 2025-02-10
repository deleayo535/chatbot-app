'use client';

import '../../../app/globals.css';
import { Modal, Backdrop, Fade, Box, Typography, IconButton } from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '24px',
    boxShadow: 24,
    p: 4,
};

export default function ConfirmationModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmationModalProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography
            className="text-center"
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textAlign: 'center' }}
            >
              {description}
            </Typography>
          )}
          <div className="flex gap-4 justify-center w-full text-xs mt-6 px-4">
            <IconButton
              className="w-1/2 p-3 bg-[#E8DEF8] rounded-3xl text-black text-sm font-bold no-hoverfill"
              onClick={onClose}
            >
              {cancelText}
            </IconButton>
            <IconButton
              onClick={onConfirm}
              className="w-1/2 p-3 bg-[#B3261E] rounded-3xl text-white text-sm font-bold no-hover"
            >
              {confirmText}
            </IconButton>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}




