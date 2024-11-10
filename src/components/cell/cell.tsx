import { type FC } from 'react';
import { type CellProps } from './types';
import { CellContainer, Figure } from './styles';

export const Cell: FC<CellProps> = (props) => {
    const { cell, isSelected, onClick } = props;

    return (
        <CellContainer
            $color={cell.color}
            $isSelected={isSelected}
            $isAvailable={cell.isAvailable}
            $withFigure={!!cell.figure}
            onClick={() => onClick(cell)}
        >
            {cell.figure && <Figure as={cell.figure.Icon} />}
        </CellContainer>
    );
};