import WhitePawn from '../../assets/svg/white-pawn.svg';
import BlackPawn from '../../assets/svg/black-pawn.svg';
import { Figure } from './Figure';
import { type Cell } from '../Cell';
import { Color } from '../Color';
import { FigureName } from './FigureName';

export class Pawn extends Figure {
    constructor(color: Color, cell: Cell) {
        const Icon = color === Color.white ? WhitePawn : BlackPawn;

        super(FigureName.pawn, color, Icon, cell);
    }
}