import { type Color } from './Color';
import { type Figure } from './figures';

export class Cell {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: Color;
    figure: Nullable<Figure> = null;
    isAvailable = false;

    constructor(x: number, y: number, color: Color) {
        this.id = Math.random();
        this.x = x;
        this.y = y;
        this.color = color;
    }

    compare = (cell: Nullable<Cell>): boolean => {
        return this.x === cell?.x && this.y === cell.y;
    };
}