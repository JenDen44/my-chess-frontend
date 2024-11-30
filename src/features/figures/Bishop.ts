import WhiteBishop from '../../assets/svg/white-bishop.svg';
import BlackBishop from '../../assets/svg/black-bishop.svg';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { Figure } from './Figure';
import { FigureName } from './FigureName';

export class Bishop extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhiteBishop : BlackBishop;

        super(FigureName.bishop, color, Icon, cell);
    }

    checkCorrectMove(cell: Cell): boolean {
        if (!super.checkCorrectMove(cell)) {
            return false;
        }


        return this.cell.checkDiagonal(cell);
    };
}
