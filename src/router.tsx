import { createBrowserRouter } from 'react-router';
import App from './pages/App/App.tsx';
import { About } from './pages/About/About.tsx';
import { Error } from './pages/Error/Error.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { ItemFullDescription } from './components/ResultArea/ItemFullDescription/ItemFullDescription.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
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
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
