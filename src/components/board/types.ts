import { type Board } from '../../features';

export interface BoardProps {
    board: Board;
    onUpdate: VoidFunction;
}