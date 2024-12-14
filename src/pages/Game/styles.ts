import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Actions = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;