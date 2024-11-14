import { type Board } from './Board';
import { type Color } from './Color';
import { type Figure } from './figures';

export class Cell {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: Color;
    figure: Nullable<Figure> = null;
    isAvailable = false;
    board: Board;

    get isEmpty(): boolean {
        return !this.figure;
    }

    constructor(x: number, y: number, color: Color, board: Board) {
        this.id = Math.random();
        this.x = x;
        this.y = y;
        this.color = color;
        this.board = board;
    }

    compare(cell: Nullable<Cell>): boolean {
        return this.x === cell?.x && this.y === cell.y;
    };

    checkHorizontal(cell: Cell): boolean {
        if (this.y !== cell.y) return false;

        const minX = Math.min(this.x, cell.x);
        const maxX = Math.max(this.x, cell.x);

        for (let x = minX + 1; x < maxX; x++) {
            if (!this.board.getCell(x, this.y).isEmpty) return false;
        }

        return true;
    }

    checkVertical(cell: Cell): boolean {
        if (this.x !== cell.x) return false;

        const minY = Math.min(this.y, cell.y);
        const maxY = Math.max(this.y, cell.y);

        for (let y = minY + 1; y < maxY; y++) {
            if (!this.board.getCell(this.x, y).isEmpty) return false;
        }

        return true;
    }

    checkDiagonal(cell: Cell): boolean {
        const difX = cell.x - this.x;
        const difY = cell.y - this.y;

        if (Math.abs(difX) !== Math.abs(difY)) return false;

        const dx = Math.sign(difX);
        const dy = Math.sign(difY);

        for (let i = 1; i < Math.abs(difX); i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty) return false;
        }

        return true;
    }
}