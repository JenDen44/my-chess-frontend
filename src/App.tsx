import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
