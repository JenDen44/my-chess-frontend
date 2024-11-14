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

    canMove(cell: Cell): boolean {
        if (!super.canMove(cell)) {
            return false;
        }

        const dx = Math.abs(this.cell.x - cell.x);
        const dy = Math.abs(this.cell.y - cell.y);

        return dx === 1 && dy === 2 || dx === 2 && dy === 1;
    };
}