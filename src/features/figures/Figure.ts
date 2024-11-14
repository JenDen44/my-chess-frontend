import { type FC } from 'react';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';
import { ShortFigureName } from './ShortFigureName';

export class Figure {
    readonly name: FigureName;
    readonly color: Color;
    readonly Icon: FC;
    cell: Cell;

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
        this.cell.figure = this;
    }

    canMove(cell: Cell): boolean {
        return !cell.figure || cell.figure.color !== this.color && cell.figure.name !== FigureName.king;
    };

    move(cell: Cell): void {
        if (this.canMove(cell)) {
            this.cell.figure = null;
            this.cell = cell;
            this.cell.figure = this;
        }
    };
}