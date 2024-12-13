import { type FC } from 'react';
import { Router } from './router';
import { GlobalStyles } from './components';

export const App: FC = () => {
    return (
        <>
            <GlobalStyles />
            <Router />
        </>
    );
};
