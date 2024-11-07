import WhiteKnight from '../../assets/svg/white-knight.svg';
import BlackKnight from '../../assets/svg/black-knight.svg';
import { Figure } from './Figure';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';

export class Knight extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhiteKnight : BlackKnight;

        super(FigureName.knight, color, Icon, cell);
    }
}