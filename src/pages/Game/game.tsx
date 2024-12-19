import { type FC } from 'react';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import { Board as BoardComponent, DrawAnswerModal, DrawModal, Info } from '../../components';
import { useGame } from './hook';
import { Actions, Container, Content, GameField } from './styles';

export const GamePage: FC = () => {
    const { token } = useParams();
    const {
        board, selectedCell, info, currentColor, onInvite, onClick, onGiveUp, isOpenDrawModal, onOpenDrawModal,
        onCloseDrawModal, isOpenDrawAnswerModal, onCloseDrawAnswerModal
    } = useGame(token);

    return (
        <Container>
            <GameField>
                <Content>
                    <Info {...info} currentColor={currentColor} />
                    <BoardComponent
                        board={board}
                        selectedCell={selectedCell}
                        onClick={ onClick }
                    />
                </Content>
                <Actions>
                    <Button variant="contained" onClick={onInvite}>Пригласить друга</Button>
                    <Button variant="contained" onClick={onOpenDrawModal}>Предложить ничью</Button>
                    <Button variant="contained" onClick={onGiveUp}>Сдаться</Button>
                </Actions>
            </GameField>
            <DrawModal token={token} isOpen={isOpenDrawModal} onClose={onCloseDrawModal} />
            <DrawAnswerModal token={token} isOpen={isOpenDrawAnswerModal} onClose={onCloseDrawAnswerModal} />
        </Container>
    );
};