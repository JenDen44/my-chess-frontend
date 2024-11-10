import { type Color, type Cell } from '../../features';

export interface CellProps {
    cell: Cell;
    isSelected: boolean;
    onClick: (cell: Cell) => void;
}

export interface CellContainerProps {
    $color: Color;
    $isSelected: boolean;
    $isAvailable: boolean;
    $withFigure: boolean;
}