import { useState, type FC } from 'react';
import { Board as BoardComponent } from './components';
import { Board, ShortFigureName } from './features';

export const App: FC = () => {
    const [ board ] = useState(new Board([ [ ShortFigureName.whiteBishop ] ]));

    return (
        <BoardComponent board={board} />
    );
};
