import { createBrowserRouter, redirect } from 'react-router-dom';
import { GamePage, NewGamePage, Layout } from '../pages';

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, loader: (): Response => redirect('new') },
            { path: 'new', Component: NewGamePage },
            { path: ':token', Component: GamePage }
        ]
    }
]);