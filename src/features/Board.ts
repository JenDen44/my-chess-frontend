import { Cell } from './Cell';
import { Color } from './Color';
import { defaultShortNames } from './consts';
import { FigureFactory, type ShortFigureName } from './figures';

export class Board {
    private figureFactory: FigureFactory;

    cells: Cell[][] = [];

    constructor(shortNames = defaultShortNames) {
        this.figureFactory = new FigureFactory();

        this.init();
        this.addFigures(shortNames);
    }

    private init = (): void => {
        const cells: Cell[][] = [];

        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];

            for (let x = 0; x < 8; x++) {
                const color = (x + y) % 2 ? Color.black : Color.white;
                const cell = new Cell(x, y, color);
                row.push(cell);
            }

            cells.push(row);
        }

        this.cells = cells;
    };

    private addFigures = (shortNames: Nullable<ShortFigureName>[][]): void => {
        console.log(shortNames, JSON.stringify(shortNames));
        for (let y = 0; y < shortNames.length; y++) {
            for (let x = 0; x < shortNames[y].length; x++) {
                const shortName = shortNames[y][x];

                if (shortName) this.figureFactory.createByShortName(shortName, this.getCell(x, y));
            }
        }
    };

    private getCell = (x: number, y: number): Cell => {
        if (!this.cells[y]?.[x]) throw new Error(`Не доступные координаты x = ${x}, y = ${y}`);

        return this.cells[y][x];
    };
}