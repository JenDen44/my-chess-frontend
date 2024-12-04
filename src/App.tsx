import { useEffect, useState, type FC } from 'react';
import { Board as BoardComponent } from './components';
import { Board, Color } from './features';

export const App: FC = () => {
    const [ board, setBoard ] = useState(new Board());
    const [ activeColor, setActiveColor ] = useState(Color.white);
    const onUpdate = (): void => {
        setBoard((prevBoard) => prevBoard.copy());
    };
    const onSwitchActiveColor = (): void => {
        setActiveColor((oldActiveColor) => oldActiveColor === Color.white ? Color.black : Color.white);
    };

    useEffect(() => {
        const newBoard = new Board();
        newBoard.init();
        newBoard.addFigures();

        setBoard(newBoard);
    }, []);

    return (
        <BoardComponent
            board={board}
            onUpdate={onUpdate}
            activeColor={activeColor}
            onSwitchActiveColor={onSwitchActiveColor}
        />
    );
};
