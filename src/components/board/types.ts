import { type Color, type Board } from '../../features';

export interface BoardProps {
    board: Board;
    activeColor: Color;
    onUpdate: VoidFunction;
    onSwitchActiveColor: VoidFunction;
}