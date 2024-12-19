import WhiteKing from '../../assets/svg/white-king.svg';
import BlackKing from '../../assets/svg/black-king.svg';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { Figure } from './Figure';
import { FigureName } from './FigureName';

export class King extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhiteKing : BlackKing;

        super(FigureName.king, color, Icon, cell);
    }

    checkCorrectMove(cell: Cell): boolean {
        if (!super.checkCorrectMove(cell)) {
            return false;
        }

        const dx = Math.abs(this.cell.x - cell.x);
        const dy = Math.abs(this.cell.y - cell.y);

        return dx <= 1 && dy <= 1;
    };
}