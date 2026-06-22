import { createBrowserRouter, Navigate } from 'react-router';
import App from './app/[page]/page';
import { About } from './app/about/page';
import { Error } from './views/Error/Error';
import { NotFoundPage } from './views/NotFoundPage/NotFoundPage';
import { ItemFullDescription } from './components/ResultArea/ItemFullDescription/ItemFullDescription';

export const router = createBrowserRouter([
  {
    path: '/:page',
    element: <App />,
    children: [
      {
        path: 'works/:bookId',
        element: <ItemFullDescription />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: '/',
    element: <Navigate to="/1" replace />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
