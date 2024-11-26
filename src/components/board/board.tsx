import { useEffect, useState, type FC } from 'react';
import { type Cell } from '../../features';
import { Cell as CellComponent } from '../Cell';
import { type BoardProps } from './types';
import { Row } from './styles';

export const Board: FC<BoardProps> = (props) => {
    const { board, onUpdate } = props;
    const [ selectedCell, setSelectedCell ] = useState<Nullable<Cell>>(null);
    const onClick = (cell: Cell): void => {
        setSelectedCell((prevSelectedCell) => {
            if (!prevSelectedCell) {
                return cell.figure ? cell : null;
            }

            if (prevSelectedCell.figure?.canMove(cell)) {
                prevSelectedCell.figure.move(cell);
                onUpdate();
            }

            return null;
        });
    };
    const onHighlightCells = (cell: Nullable<Cell>): void => {
        board.highlightCells(cell);
        onUpdate();
    };

    useEffect(() => {
        onHighlightCells(selectedCell);
    }, [ selectedCell ]);

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