import WhiteRook from '../../assets/svg/white-rook.svg';
import BlackRook from '../../assets/svg/black-rook.svg';
import { Figure } from './Figure';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';

export class Rook extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhiteRook : BlackRook;

        super(FigureName.rook, color, Icon, cell);
    }

    canMove(cell: Cell): boolean {
        if (!super.canMove(cell)) {
            return false;
        }


        return this.cell.checkHorizontal(cell) || this.cell.checkVertical(cell);
    };
}