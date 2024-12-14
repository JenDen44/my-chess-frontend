import { Cell } from './Cell';
import { Color } from './Color';
import { defaultShortNames } from './consts';
import { type Figure, FigureFactory, FigureName, type ShortFigureName } from './figures';
import { type PrevStep } from './PrevStep';

export class Board {
    private figureFactory: FigureFactory;

    cells: Cell[][] = [];

    passantCell: Nullable<Cell> = null;

    prevStep: Nullable<PrevStep> = null;

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
        board.passantCell = this.passantCell;
        board.prevStep = this.prevStep;

        for (let y = 0; y < board.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = board.getCell(x, y);

                cell.setBoard(board);
            }
        }

        return board;
    };

    setPrevStep(fromCell: Cell, toCell: Cell): void {
        this.prevStep = {
            fromCell,
            toCell,
            formFigure: fromCell.figure,
            toFigure: toCell.figure
        };
    }

    checkIfMove(figure: Figure, toCell: Cell): boolean {
        figure.move(toCell, false);

        const king = this.findFigure(FigureName.king, figure.color);
        const canBeEaten = this.checkCanBeEaten(king);

        this.goBack();

        return canBeEaten;
    }

    findFigure(name: FigureName, color: Color): Nullable<Figure> {
        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = this.getCell(x, y);

                if (cell.figure?.name === name && cell.figure.color === color) {
                    return cell.figure;
                }
            }
        }

        return null;
    }

    checkCanBeEaten(figure: Nullable<Figure>): boolean {
        if (!figure) {
            return false;
        }

        const oppositeColor = figure.color === Color.white ? Color.black : Color.white;

        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = this.getCell(x, y);

                if (cell.figure?.color === oppositeColor && cell.figure.checkCorrectMove(figure.cell)) {
                    return true;
                }
            }
        }

        return false;
    }

    goBack(): void {
        if (!this.prevStep) {
            return;
        }

        const { fromCell, formFigure, toCell, toFigure } = this.prevStep;

        fromCell.setFigure(formFigure);
        toCell.setFigure(toFigure);
    }

    move({ fromX, fromY, toX, toY }:{fromX: number, fromY: number, toX: number, toY: number}): void {
        const fromCell = this.getCell(fromX, fromY);
        const toCell = this.getCell(toX, toY);

        fromCell.figure?.move(toCell);
    }
}