import { type FC } from 'react';
import { Cell as CellComponent } from '../Cell';
import { type BoardProps } from './types';
import { Row } from './styles';

export const Board: FC<BoardProps> = (props) => {
    const { board, selectedCell, onClick } = props;

    return (
        <div>
            {board.cells.map((row, index) => (
                <Row key={index}>
                    {row.map((cell) => (
                        <CellComponent
                            key={cell.id}
                            cell={cell}
                            isSelected={cell.compare(selectedCell)}
                            onClick={onClick}
                        />
                    ))}
                </Row>
            ))}
        </div>
    );
};