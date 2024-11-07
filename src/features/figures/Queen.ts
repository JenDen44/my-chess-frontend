import WhiteQueen from '../../assets/svg/white-queen.svg';
import BlackQueen from '../../assets/svg/black-queen.svg';
import { Figure } from './Figure';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';

export class Queen extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhiteQueen : BlackQueen;

        super(FigureName.queen, color, Icon, cell);
    }
}