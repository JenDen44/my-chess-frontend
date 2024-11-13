import WhiteKing from '../../assets/svg/white-king.svg';
import BlackKing from '../../assets/svg/black-king.svg';
import { Figure } from './Figure';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';

export class King extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhiteKing : BlackKing;

        super(FigureName.king, color, Icon, cell);
    }

    canMove(cell: Cell): boolean {
        if (!super.canMove(cell)) {
            return false;
        }

        const dx = Math.abs(this.cell.x - cell.x);
        const dy = Math.abs(this.cell.y - cell.y);

        return dx <= 1 && dy <= 1;
    };
}