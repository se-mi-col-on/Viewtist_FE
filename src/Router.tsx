import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Notify from './pages/Notify';
import ChannelSettings from './pages/ChannelSettings';
import Muse from './pages/Muse';
import Subscriptions from './pages/Subscriptions';
import Community from './pages/Community';
import Channel from './pages/Channel';
import CreatePost from './pages/CreatePost';
import Layout from './components/Layout';
import PostDetail from './pages/PostDetail';
import UpdatePost from './pages/UpdatePost';
import StreamingDownLoad from './pages/StreamingDownLoad';
import StreamingSetting from './pages/StreamingSetting';
import StreamingLive from './pages/StreamingLive';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import KakaoAuth from './components/KakaoAuth';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />}>
          <Route path='/category/:categoryName' element={<Home />} />
          <Route path='/search/:streamerName' element={<Home />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/channel/:name' element={<Channel />}>
            <Route path='muse' element={<Muse />} />
            <Route path='subscriptions' element={<Subscriptions />} />

            <Route path='community' element={<Community />}>
              <Route path='write' element={<CreatePost />} />
              <Route path='detail/:id' element={<PostDetail />} />
              <Route path='update/:id' element={<UpdatePost />} />
            </Route>
          </Route>
          <Route path='/notify' element={<Notify />} />
          <Route path='/channel-settings' element={<ChannelSettings />} />
          <Route path='/streaming/obs_downLoad' element={<StreamingDownLoad />} />
          <Route path='/streaming/setting' element={<StreamingSetting />} />
          <Route path='/streaming/live/:id' element={<StreamingLive />} />
        </Route>

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/kakao/auth' element={<KakaoAuth />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
