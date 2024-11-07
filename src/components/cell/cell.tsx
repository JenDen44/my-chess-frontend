import { type FC } from 'react';
import { type CellProps } from './types';
import { CellContainer, Figure } from './styles';

export const Cell: FC<CellProps> = (props) => {
    const { cell } = props;

    return (
        <CellContainer $color={cell.color}>
            {cell.figure && <Figure as={cell.figure.Icon} />}
        </CellContainer>
    );
};