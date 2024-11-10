import styled from 'styled-components';
import { Color } from '../../features';
import { type CellContainerProps } from './types';

export const CellContainer = styled.div<CellContainerProps>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    background-color: ${(props): string => {
        if (props.$isSelected) return '#B2A7FC';

        if(props.$isAvailable && props.$withFigure) return '#7B61FF';

        return props.$color === Color.white ? '#E8EDF9' : '#B7C0D8';
    }};
    &:after {
        position: absolute;
        content: "";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #7B61FF;
        display: ${(props): string => props.$isAvailable && !props.$withFigure ? 'block': 'none'};
    }
`;

export const Figure = styled.div`
    width: 56px;
    height: 56px;
`;