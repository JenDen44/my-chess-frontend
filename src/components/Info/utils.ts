import { type Color, type GameInfoDetail, type GameInfoStatus } from '../../features';

export const getInfo = (currentColor: Color, status: GameInfoStatus, detail?: GameInfoDetail): string => {
    if (status === 'in_progress') {
        return detail === currentColor ? 'Ходите' : 'Ожидание хода соперника';
    }

    switch (detail) {
    case 'white':
        return 'Выиграли белые!';
    case 'black':
        return 'Выиграли черные!';
    default:
        return 'Ничья';
    }
};