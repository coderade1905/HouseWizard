import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import supabase from '../supabase.js';
import { HomeContext } from '../App';
import translation from './translation/translation.js';
import { useContext } from "react";

export default function AlertDialogModal({ open, setOpen, id, setDeleted }) {
  const { language } = useContext(HomeContext);
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {translation[language]['cfn']}
          </DialogTitle>
          <Divider />
          <DialogContent>
            {translation[language]['ays']}
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={async () => {
              const { error } = await supabase
                .from('listings')
                .delete()
                .eq('id', id);

              if (!error) {
                setOpen(false);
                setDeleted(prev => prev += 1);
              } else {
                console.error("Error deleting listing:", error.message);
              }
            }}>
              {translation[language]['yes']}
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              {translation[language]['no']}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}