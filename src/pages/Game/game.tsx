import { type FC } from 'react';
import { Board as BoardComponent, Button, Info } from '../../components';
import { useParams } from 'react-router';
import { useGame } from './hook';
import { Actions, Container, Content } from './styles';

export const GamePage: FC = () => {
    const { token } = useParams();
    const { board, selectedCell, info, currentColor, onInvite, onClick } = useGame(token);

    return (
        <Container>
            <Content>
                <Info {...info} currentColor={currentColor} />
                <BoardComponent
                    board={board}
                    selectedCell={selectedCell}
                    onClick={ onClick }
                />
                <Actions>
                    <Button>Сдаться</Button>
                    <Button onClick={onInvite}>Пригласить друга</Button>
                </Actions>
            </Content>
        </Container>
    );
};