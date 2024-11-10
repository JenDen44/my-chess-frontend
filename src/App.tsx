import { useEffect, useState, type FC } from 'react';
import { Board as BoardComponent } from './components';
import { Board } from './features';

export const App: FC = () => {
    const [ board, setBoard ] = useState(new Board());
    const onUpdate = (): void => {
        setBoard((prevBoard) => prevBoard.copy());
    };

    useEffect(() => {
        const newBoard = new Board();
        newBoard.init();
        newBoard.addFigures();

        setBoard(newBoard);
    }, []);

    return (
        <BoardComponent board={board} onUpdate={onUpdate} />
    );
};
