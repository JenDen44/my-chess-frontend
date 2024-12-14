import { useCallback, useEffect, useRef, useState } from 'react';
import { Board, type GameInfo, Color, type Cell } from '../../features';
import { getGame, giveUp, move } from '../../api';
import { useNavigate } from 'react-router-dom';
import { type UseGame } from './types';
import { useWebsocket } from '../../hooks';
import { type WebSocketData } from '../../hooks/websocket/types';

export const useGame = (token?: string): UseGame => {
    const [ board, setBoard ] = useState<Board>(new Board());
    const [ info, setInfo ] = useState<GameInfo>({ status: 'in_process' });
    const [ otherToken, setOtherToken ] = useState('');
    const [ currentColor, setCurrentColor ] = useState<Color>(Color.white);
    const selectedCellRef = useRef<Nullable<Cell>>(null);

    const navigate = useNavigate();
    const { onSubscribe, onUnsubscribe } = useWebsocket(token);

    const onGiveUp = useCallback(() => {
        if (!token || info.status === 'finished') return;

        giveUp(token).then(setInfo);
    }, [ info, token ]);
    const onInvite = useCallback(() => {
        navigator.clipboard.writeText(`${window.location.origin}/${otherToken}`);
    }, [ otherToken ]);

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

        board.move(data.entity);
        setBoard(board.copy());
        setInfo((prevInfo) => ({ ...prevInfo, detail: data.entity.activeColor  }));
    }, [ board ]);

    useEffect(() => {
        onSubscribe(onMessage);

        return (): void => onUnsubscribe(onMessage);
    }, [ onSubscribe, onUnsubscribe, onMessage ]);

    useEffect(() => {
        if (token) {
            getGame(token).then((game) => {
                const { tokenForBlackPlayer, tokenForWhitePlayer, board, active, currentColor, info } = game;
                const stateBoard = new Board();
                stateBoard.init();
                stateBoard.addFigures(board);

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

    console.log(JSON.stringify(info));

    return { board, selectedCell: selectedCellRef.current, info, currentColor, onInvite, onClick, onGiveUp };
};