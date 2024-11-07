import { type Color, type Cell } from '../../features';

export interface CellProps {
    cell: Cell;
}

export interface CellContainerProps {
    $color: Color;
}