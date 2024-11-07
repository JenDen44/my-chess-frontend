import { type Color } from './Color';
import { type Figure } from './figures';

export class Cell {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: Color;
    figure: Nullable<Figure>;

    constructor(x: number, y: number, color: Color, figure: Nullable<Figure> = null) {
        this.id = Math.random();
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
    }
}