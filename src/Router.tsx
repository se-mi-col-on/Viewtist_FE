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
import StreamingDownLoad from './pages/StreamingDownLoad';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import UpdatePost from './pages/UpdatePost';
import ProtectedRoute from './components/ProtectedRoute';

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
        path: 'streaming/obs_downLoad',
        element: <StreamingDownLoad />,
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
        element: (
          <ProtectedRoute>
            <ChannelSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'channel',
        element: (
          <ProtectedRoute>
            <Channel />
          </ProtectedRoute>
        ),
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
