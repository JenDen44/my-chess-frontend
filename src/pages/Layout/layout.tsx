import { type FC } from 'react';
import { Container } from './styles';
import { Outlet } from 'react-router';

export const Layout: FC = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};