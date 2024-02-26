import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Home />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
]);
