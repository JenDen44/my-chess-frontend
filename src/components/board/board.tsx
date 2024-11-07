import { type FC } from 'react';
import { type BoardProps } from './types';
import { Cell } from '../cell';
import { Row } from './styles';

export const Board: FC<BoardProps> = (props) => {
    const { board } = props;

    return (
        <div>
            {board.cells.map((row, index) => (
                <Row key={index}>
                    {row.map((cell) => (
                        <Cell key={cell.id} cell={cell} />
                    ))}
                </Row>
            ))}
        </div>
    );
};