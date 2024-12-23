import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board, type GameInfo, Color, type Cell } from '../../features';
import { getGame, giveUp, move } from '../../api';
import { type UseGame } from './types';
import { useWebsocket, type WebSocketData } from '../../hooks';

export const useGame = (token?: string): UseGame => {
    const [ board, setBoard ] = useState<Board>(new Board());
    const [ info, setInfo ] = useState<GameInfo>({ status: 'in_process' });
    const [ otherToken, setOtherToken ] = useState('');
    const [ currentColor, setCurrentColor ] = useState<Color>(Color.white);
    const [ date, setDate ] = useState(new Date());
    const selectedCellRef = useRef<Nullable<Cell>>(null);
    const navigate = useNavigate();
    const { onSubscribe, onUnsubscribe } = useWebsocket(token);
    const [ isOpenDrawModal, setOpenDrawModal ] = useState(false);
    const [ isOpenDrawAnswerModal, setOpenDrawAnswerModal ] = useState(false);
    const isShowTimer = info.status === 'in_process' && currentColor === info.detail;

    const onGiveUp = useCallback(() => {
        if (!token || info.status === 'finished') return;

        giveUp(token).then(setInfo);
    }, [ info, token ]);
    const onInvite = useCallback(() => {
        navigator.clipboard.writeText(`${window.location.origin}/${otherToken}`);
    }, [ otherToken ]);
    const onOpenDrawModal = useCallback(() => {
        if (!token || info.status === 'finished') return;

        setOpenDrawModal(true);
    }, [ info, token ]);
    const onCloseDrawModal = useCallback(() => {
        setOpenDrawModal(false);
    }, []);
    const onCloseDrawAnswerModal = useCallback(() => {
        setOpenDrawAnswerModal(false);
    }, []);

    const onClick = useCallback((cell: Cell) => {
        if (!token || info.status === 'finished' || info.detail !== currentColor) return;

        if (!selectedCellRef.current) {
            selectedCellRef.current = cell.figure?.color === currentColor ? cell : null;
            board.highlightCells(selectedCellRef.current);
            setBoard(board.copy());

            return;
        }

        if (selectedCellRef.current.figure?.canMove(cell)) {
            move(
                token,
                { fromX: selectedCellRef.current.x, fromY: selectedCellRef.current.y, toX: cell.x, toY: cell.y }
            ).then((newInfo) => {
                selectedCellRef.current?.figure?.move(cell);
                selectedCellRef.current = null;
                board.highlightCells(selectedCellRef.current);
                setBoard(board.copy());

                if (newInfo.status === 'finished') {
                    setInfo(newInfo);
                } else {
                    setInfo({ ...newInfo, detail: currentColor === Color.white ? Color.black : Color.white });
                }
            });

            return;
        }

        selectedCellRef.current = null;
        board.highlightCells(selectedCellRef.current);
        setBoard(board.copy());
    }, [ token, info, currentColor, board ]);

    const onMessage = useCallback((data: WebSocketData) => {
        if (data.type === 'STATUS_CHANGED') {
            setInfo(data.entity);

            return;
        }
        if (data.type === 'PLAYER_MOVED') {
            board.move(data.entity);
            setBoard(board.copy());
            setInfo((prevInfo) => ({ ...prevInfo, detail: data.entity.activeColor  }));
            setDate(new Date(data.entity.date));

            return;
        }

        if (data.type === 'DRAW_REQUEST') {
            setOpenDrawAnswerModal(true);
        }
    }, [ board ]);

    useEffect(() => {
        onSubscribe(onMessage);

        return (): void => onUnsubscribe(onMessage);
    }, [ onSubscribe, onUnsubscribe, onMessage ]);

    useEffect(() => {
        if (token) {
            getGame(token).then((game) => {
                const { tokenForBlackPlayer, tokenForWhitePlayer, board, active, currentColor, info, date } = game;
                const stateBoard = new Board();
                stateBoard.init();
                stateBoard.addFigures(board);
                setDate(new Date(date));

                setBoard(stateBoard);

                if (info.status === 'finished') {
                    setInfo(info);
                } else {
                    setInfo({ status: 'in_process', detail: active });
                }

                setCurrentColor(currentColor);
                setOtherToken(currentColor === Color.white ? tokenForBlackPlayer : tokenForWhitePlayer);
            }).catch(() => {
                navigate('../new');
            });
        }
    }, [ navigate, token ]);

    return {
        board,
        selectedCell: selectedCellRef.current,
        info,
        currentColor,
        onInvite,
        onClick,
        onGiveUp,
        isOpenDrawModal,
        onOpenDrawModal,
        onCloseDrawModal,
        isOpenDrawAnswerModal,
        onCloseDrawAnswerModal,
        date,
        isShowTimer
    };
};