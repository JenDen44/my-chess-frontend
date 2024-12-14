import { type Board, type Cell } from '../../features';

export interface BoardProps {
    board: Board;
    selectedCell: Nullable<Cell>;
    onClick: (cell: Cell) => void;
}