import WhitePawn from '../../assets/svg/white-pawn.svg';
import BlackPawn from '../../assets/svg/black-pawn.svg';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { Figure } from './Figure';
import { FigureName } from './FigureName';
import { Queen } from './Queen';

export class Pawn extends Figure {
    isFirstStep = true;

    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhitePawn : BlackPawn;

        super(FigureName.pawn, color, Icon, cell);
    }

    canMove(cell: Cell): boolean {
        if (!super.canMove(cell)) {
            return false;
        }

        const currentDY = this.color === Color.black ? 1 : -1;
        const dx = cell.x - this.cell.x;
        const dy = cell.y - this.cell.y;

        if (cell.checkEnemy(this)) {
            return Math.abs(dx) === 1 && dy === currentDY;
        }

        if (Math.abs(dx) === 1 && dy === currentDY && this.board.passantCell?.compare(cell)) {
            return true;
        }

        if (dx !== 0) {
            return false;
        }

        if (dy === currentDY) {
            return true;
        }

        if (
            this.isFirstStep &&
            dy === 2 * currentDY &&
            this.board.getCell(this.cell.x, this.cell.y + currentDY).isEmpty
        ) {
            return true;
        }

        return false;
    }

    move(cell: Cell): void {
        if (this.isFirstStep) {
            this.isFirstStep = false;
            const dx = cell.x - this.cell.x;
            const dy = cell.y - this.cell.y;
            const currentDY = this.color === Color.black ? 1 : -1;

            super.move(cell);

            if (dx === 0 && dy === 2 * currentDY) {
                this.board.passantCell = this.board.getCell(this.cell.x, this.cell.y - currentDY);
            }

            return;
        }

        if (cell.y === 0 || cell.y === 7) {
            super.move(cell);

            new Queen(this.color, cell);

            return;
        }


        if (cell.compare(this.board.passantCell)) {
            super.move(cell);

            const currentDY = this.color === Color.black ? -1 : 1;
            const figureCell = this.board.getCell(cell.x, cell.y + currentDY);
            figureCell.figure = null;

            return;
        }

        super.move(cell);
    }
}