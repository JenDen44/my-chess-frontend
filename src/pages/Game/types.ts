import { type Cell, type Board, type Color, type GameInfo } from '../../features';

export interface UseGame {
    board: Board;
    selectedCell: Nullable<Cell>;
    currentColor: Color;
    info: GameInfo;
    onInvite: VoidFunction;
    onGiveUp: VoidFunction;
    onClick: (cell: Cell) => void;
    isOpenDrawModal: boolean;
    onOpenDrawModal: VoidFunction;
    onCloseDrawModal: VoidFunction;
    isOpenDrawAnswerModal: boolean;
    onCloseDrawAnswerModal: VoidFunction;
}