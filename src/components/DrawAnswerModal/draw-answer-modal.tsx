import { type FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { type DrawAnswerModalProps } from './types';
import { useDrawAnswerModal } from './hook';

export const DrawAnswerModal: FC<DrawAnswerModalProps> = (props) => {
    const { isOpen } = props;
    const { onAnswer } = useDrawAnswerModal(props);

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Предложение ничьи</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Соперник предложил ничью. Согласиться?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onAnswer(false)}>Нет</Button>
                <Button variant="contained" onClick={() => onAnswer(true)}>Да</Button>
            </DialogActions>
        </Dialog>
    );
};