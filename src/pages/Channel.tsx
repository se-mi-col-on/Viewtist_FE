import { IoVideocamOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, Outlet, useMatch, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserInfo } from '../utils/channelSetting/useUserInfo';
import { currentUserInfo } from '../store';
import { useRecoilValue } from 'recoil';

export default function Channel() {
  const museMatch = useMatch('channel/:name/muse');
  const subscriptionsMatch = useMatch('channel/:name/subscriptions');
  const communityMatch = useMatch('/channel/:name/community');
  const writeMatch = useMatch('/channel/:name/community/write');
  const updateMatch = useMatch('/channel/:name/community/update/:id');
  const detailMatch = useMatch('/channel/:name/community/detail/:id');
  const { name } = useParams();


  const { data, isLoading } = useUserInfo(name!);

  const matches = communityMatch || writeMatch || updateMatch || detailMatch;

  return (
    <div className='p-3 mt-5 border-2 sm:w-full md:w-2/3'>
      <div className='flex p-3 my-5 border-2 sm:flex-col sm:items-center sm:justify-center sm:gap-y-5 md:flex-row md:items-start md:justify-between'>
        <div className='flex items-center gap-x-5'>
          <div className='avatar'>
            <div className='rounded-full w-14 ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src={userInfo?.profilePhotoUrl} />
            </div>
          </div>

          <div>
            <h1 className='mb-1 text-2xl'>{userInfo?.nickname}</h1>
            <span>{userInfo?.channelIntroduction}</span>
          </div>
        </div>

        <div className='flex items-center gap-x-3'>
          <Link to={'/streaming/obs_downLoad'}>
            <button className='rounded-3xl btn btn-outline sm:btn-xs md:btn-sm'>
              <IoVideocamOutline />
              방송하기
            </button>
          </Link>
          <Link to={'/channel-settings'}>
            <button className='btn btn-outline sm:btn-xs md:btn-sm rounded-3xl'>
              <IoSettingsOutline />
              채널관리
            </button>
          </Link>
        </div>
      </div>
      <ul className='flex items-center justify-center sm:text-xs sm:gap-x-5 md:text-lg md:gap-x-10'>
        <li className={`relative ${museMatch && 'font-extrabold'}`}>
          <Link to={`/channel/${data?.nickname}/muse`}>
            <button>후원관리</button>
          </Link>
          {museMatch && (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 m-auto bg-red-700 rounded-full sm:w-2 sm:h-2 md:w-3 md:h-3 -bottom-3'
            ></motion.div>
          )}
        </li>
        <li className={`relative ${subscriptionsMatch && 'font-extrabold'}`}>
          <Link to={`/channel/${data?.nickname}/subscriptions`}>
            <button>내가 구독한 채널</button>
          </Link>
          {subscriptionsMatch && (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 m-auto bg-red-700 rounded-full sm:w-2 sm:h-2 md:w-3 md:h-3 -bottom-3'
            ></motion.div>
          )}
        </li>
        <li className={`relative ${communityMatch && 'font-extrabold'}`}>
          <Link to={`/channel/${data?.nickname}/community`}>
            <button>공지</button>
          </Link>
          {matches ? (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 m-auto bg-red-700 rounded-full sm:w-2 sm:h-2 md:w-3 md:h-3 -bottom-3'
            ></motion.div>
          ) : null}
        </li>
      </ul>
      <div className='my-12 divider'></div>
      <Outlet context={data} />
    </div>
  );
}
