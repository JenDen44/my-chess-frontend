import { RouterProvider } from 'react-router-dom';
import { type ReactElement } from 'react';
import { routes } from './routes';

export const Router = (): ReactElement => {
    return <RouterProvider router={ routes } />;
};