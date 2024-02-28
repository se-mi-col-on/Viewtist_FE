import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import StudioSet from './pages/StudioSet';
import ChannelSet from './pages/ChannelSet';

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
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            path: 'studio-set',
            element: <StudioSet />,
          },
          {
            path: 'channel-set',
            element: <ChannelSet />,
          },
        ],
      },
    ],
  },
]);
