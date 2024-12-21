import { type FC } from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { start } from '../../api';
import { Color } from '../../features';
import { Content } from './styles';

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
            <Button variant="contained" onClick={() => onStart(Color.white)}>Начать за белых</Button>
            <Button variant="contained" onClick={() => onStart(Color.black)}>Начать за черных</Button>
        </Content>
    );
};