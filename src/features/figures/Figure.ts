import { type FC } from 'react';
import { type Board } from '../Board';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';
import { ShortFigureName } from './ShortFigureName';

export class Figure {
    name: FigureName;
    color: Color;
    Icon: FC;
    cell: Cell;
    board: Board;

    get shortName(): ShortFigureName {
        if (this.color === Color.white) {
            switch (this.name) {
            case FigureName.king:
                return ShortFigureName.whiteKing;
            case FigureName.queen:
                return ShortFigureName.whiteQueen;
            case FigureName.bishop:
                return ShortFigureName.whiteBishop;
            case FigureName.knight:
                return ShortFigureName.whiteKnight;
            case FigureName.rook:
                return ShortFigureName.whiteRook;
            default:
                return ShortFigureName.whitePawn;
            }
        }

        switch (this.name) {
        case FigureName.king:
            return ShortFigureName.blackKing;
        case FigureName.queen:
            return ShortFigureName.blackQueen;
        case FigureName.bishop:
            return ShortFigureName.blackBishop;
        case FigureName.knight:
            return ShortFigureName.blackKnight;
        case FigureName.rook:
            return ShortFigureName.blackRook;
        default:
            return ShortFigureName.blackPawn;
        }
    }

    constructor(name: FigureName, color: Color, Icon: FC, cell: Cell) {
        this.name = name;
        this.color = color;
        this.Icon = Icon;
        this.cell = cell;
        if (this.cell) {
            this.cell.figure = this;
        }
        this.board = this.cell?.board;
    }

    checkCorrectMove(cell: Cell): boolean {
        return !cell.figure || cell.figure.color !== this.color;
    }

    canMove(cell: Cell): boolean {
        if (cell.figure && cell.figure.name === FigureName.king) {
            return false;
        }

        if (!this.checkCorrectMove(cell)) {
            return false;
        }

        return !this.board.checkIfMove(this, cell);
    };

    move(cell: Cell, isResetPassant = true): void {
        this.board.setPrevStep(this.cell, cell);
        this.cell.figure = null;
        this.cell = cell;
        this.cell.figure = this;

        if (isResetPassant) {
            this.board.passantCell = null;
        }
    };
}