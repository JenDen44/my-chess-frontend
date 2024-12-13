import { type FC } from 'react';
import { Content } from './styles';
import { Button } from '../../components';
import { start } from '../../api';
import { useNavigate } from 'react-router';
import { Color } from '../../features';

export const NewGamePage: FC = () => {
    const navigate = useNavigate();
    const onStart = (color: Color): void => {
        start(color).then((game) => {
            const { tokenForBlackPlayer, tokenForWhitePlayer, currentColor } = game;
            const currentToken = currentColor === Color.white ? tokenForWhitePlayer : tokenForBlackPlayer;

            navigate(`../${currentToken}`);
        });
    };
    return (
        <Content>
            <Button onClick={() => onStart(Color.white)}>Начать за белых</Button>
            <Button onClick={() => onStart(Color.black)}>Начать за черных</Button>
        </Content>
    );
};