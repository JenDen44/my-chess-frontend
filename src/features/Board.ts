import { Cell } from './Cell';
import { Color } from './Color';
import { defaultShortNames } from './consts';
import { FigureFactory, type ShortFigureName } from './figures';

export class Board {
    private figureFactory: FigureFactory;

    cells: Cell[][] = [];

    constructor() {
        this.figureFactory = new FigureFactory();
    }

    getCell(x: number, y: number): Cell {
        if (!this.cells[y]?.[x]) throw new Error(`Не доступные координаты x = ${x}, y = ${y}`);

        return this.cells[y][x];
    };

    init(): void {
        const cells: Cell[][] = [];

        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];

            for (let x = 0; x < 8; x++) {
                const color = (x + y) % 2 ? Color.black : Color.white;
                const cell = new Cell(x, y, color, this);
                row.push(cell);
            }

            cells.push(row);
        }

        this.cells = cells;
    };

    addFigures(shortNames: Nullable<ShortFigureName>[][] = defaultShortNames): void {
        for (let y = 0; y < shortNames.length; y++) {
            for (let x = 0; x < shortNames[y].length; x++) {
                const shortName = shortNames[y][x];

                if (shortName) this.figureFactory.createByShortName(shortName, this.getCell(x, y));
            }
        }
    };

    highlightCells(selectedCell: Nullable<Cell>): void {
        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = this.getCell(x, y);
                cell.isAvailable = !!selectedCell?.figure?.canMove(cell);
            }
        }
    };

    copy(): Board {
        const board = new Board();
        board.cells = this.cells;

        for (let y = 0; y < board.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = board.getCell(x, y);
                cell.board = board;
            }
        }

        return board;
    };
}