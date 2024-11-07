import { type Figure } from './Figure';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { Bishop } from './Bishop';
import { FigureName } from './FigureName';
import { King } from './King';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Queen } from './Queen';
import { Rook } from './Rook';
import { ShortFigureName } from './ShortFigureName';

export class FigureFactory {
    create = (name: FigureName, color: Color, cell: Cell): Figure => {
        switch (name) {
        case FigureName.king:
            return new King(color, cell);
        case FigureName.queen:
            return new Queen(color, cell);
        case FigureName.bishop:
            return new Bishop(color, cell);
        case FigureName.knight:
            return new Knight(color, cell);
        case FigureName.rook:
            return new Rook(color, cell);
        default:
            return new Pawn(color, cell);
        }
    };

    createByShortName = (shortName: ShortFigureName, cell: Cell): Figure => {
        const name = this.getName(shortName);
        const color = this.getColor(shortName);

        return this.create(name, color, cell);
    };

    private getName = (shortName: ShortFigureName): FigureName => {
        switch (shortName) {
        case ShortFigureName.whiteKing:
        case ShortFigureName.blackKing:
            return FigureName.king;
        case ShortFigureName.whiteQueen:
        case ShortFigureName.blackQueen:
            return FigureName.queen;
        case ShortFigureName.whiteBishop:
        case ShortFigureName.blackBishop:
            return FigureName.bishop;
        case ShortFigureName.whiteKnight:
        case ShortFigureName.blackKnight:
            return FigureName.knight;
        case ShortFigureName.whiteRook:
        case ShortFigureName.blackRook:
            return FigureName.rook;
        default:
            return FigureName.pawn;
        }
    };

    private getColor = (shortName: ShortFigureName): Color => {
        switch (shortName) {
        case ShortFigureName.whiteKing:
        case ShortFigureName.whiteQueen:
        case ShortFigureName.whiteBishop:
        case ShortFigureName.whiteKnight:
        case ShortFigureName.whiteRook:
        case ShortFigureName.whitePawn:
            return Color.white;
        default:
            return Color.black;
        }
    };
}