import { type FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { type DrawModalProps } from './types';
import { useDrawModal } from './hook';

export const DrawModal: FC<DrawModalProps> = (props) => {
    const { isOpen } = props;
    const { isWait, onClose, onDraw } = useDrawModal(props);

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Предложить ничью</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {isWait ? 'Ожидайте ответа соперника' : 'Вы точно хотите предложить ничью?'}
                </DialogContentText>
            </DialogContent>
            {!isWait && (
                <DialogActions>
                    <Button onClick={onClose}>Нет</Button>
                    <Button variant="contained" onClick={onDraw}>Да</Button>
                </DialogActions>
            )}
        </Dialog>
    );
};