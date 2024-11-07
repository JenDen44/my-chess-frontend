import styled from 'styled-components';
import { type CellContainerProps } from './types';
import { Color } from '../../features';

export const CellContainer = styled.div<CellContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    background-color: ${(props): string => props.$color === Color.white ? '#E8EDF9' : '#B7C0D8'}
`;

export const Figure = styled.div`
    width: 56px;
    height: 56px;
`;