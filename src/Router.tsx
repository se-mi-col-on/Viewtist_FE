import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Community from './pages/Community';
import Muse from './pages/Muse';
import Subscriptions from './pages/Subscriptions';
import Notify from './pages/Notify';
import Channel from './pages/Channel';
import ChannelSettings from './pages/ChannelSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
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
        path: 'notify',
        element: <Notify />,
      },
      {
        path: 'channel-settings',
        element: <ChannelSettings />,
      },
      {
        path: 'channel',
        element: <Channel />,
        children: [
          {
            path: 'muse',
            element: <Muse />,
          },
          {
            path: 'subscriptions',
            element: <Subscriptions />,
          },
          {
            path: 'community',
            element: <Community />,
          },
        ],
      },
    ],
  },
]);
