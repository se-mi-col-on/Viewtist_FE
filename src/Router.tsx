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
import StreamingSetting from './pages/StreamingSetting';
import StreamingLive from './pages/StreamingLive';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import UpdatePost from './pages/UpdatePost';

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
        path: 'category/:categoryName',
        element: <Home />,
      },
      {
        path: 'search/:streamerName',
        element: <Home />,
      },
      {
        path: 'streaming/setting',
        element: <StreamingSetting />,
      },
      {
        path: 'streaming/live',
        element: <StreamingLive />,
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
            children: [
              {
                path: 'write',
                element: <CreatePost />,
              },
              {
                path: 'detail/:id',
                element: <PostDetail />,
              },
              {
                path: 'update/:id',
                element: <UpdatePost />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
