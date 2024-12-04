import { type Cell } from './Cell';
import { type Figure } from './figures';

export interface PrevStep {
    fromCell: Cell;
    toCell: Cell;
    formFigure: Nullable<Figure>;
    toFigure: Nullable<Figure>;
}