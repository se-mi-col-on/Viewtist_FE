import { IoVideocamOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, Outlet, useMatch, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from '../store';

export default function Channel() {
  const museMatch = useMatch('channel/muse');
  const subscriptionsMatch = useMatch('channel/subscriptions');
  const communityMatch = useMatch('/channel/community');
  const isLogIn = useRecoilValue(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) {
      navigate('/');
    }
  }, [isLogIn, navigate]);
  return (
    <div className='w-4/5 p-3 m-auto mt-5 border-2'>
      <div className='flex p-3 my-5 border-2 sm:flex-col sm:items-center sm:justify-center sm:gap-y-5 md:flex-row md:items-start md:justify-between'>
        <div className='flex items-center gap-x-5'>
          <div className='avatar'>
            <div className='rounded-full w-14 ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>

          <div>
            <h1 className='mb-1 text-2xl'>이름</h1>
            <span>소개글</span>
          </div>
        </div>

        <div className='flex items-center gap-x-3'>
          <button className='rounded-3xl btn btn-outline sm:btn-xs md:btn-sm'>
            <IoVideocamOutline />
            방송하기
          </button>
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
          <Link to={'muse'}>
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
          <Link to={'subscriptions'}>
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
          <Link to={'community'}>
            <button>커뮤니티</button>
          </Link>
          {communityMatch && (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 m-auto bg-red-700 rounded-full sm:w-2 sm:h-2 md:w-3 md:h-3 -bottom-3'
            ></motion.div>
          )}
        </li>
      </ul>
      <div className='my-12 divider'></div>
      <Outlet />
    </div>
  );
}
