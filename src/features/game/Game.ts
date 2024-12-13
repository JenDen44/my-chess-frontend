import { type Color } from '../Color';
import { type ShortFigureName } from '../figures';
import { type GameInfo } from './GameInfo';

export interface Game {
    tokenForWhitePlayer: string;
    tokenForBlackPlayer: string;
    info: GameInfo;
    board: Nullable<ShortFigureName>[][];
    active: Color;
    currentColor: Color;
}