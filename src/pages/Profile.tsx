import { IoVideocamOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, Outlet, useMatch, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from '../store';

export default function Profile() {
  const studioSetMatch = useMatch('profile/studio-set');
  const channelSetMatch = useMatch('profile/channel-set');
  const isLogIn = useRecoilValue(isLoggedIn);
  const navigate = useNavigate();

  // console.log(studioSetMatch,channelSetMatch)

  useEffect(() => {
    if (!isLogIn) {
      navigate('/');
    }
  }, [isLogIn, navigate]);
  return (
    <div className='w-4/5 p-3 m-auto border-2'>
      <div className='flex items-start justify-between my-5 border-2'>
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
          <button className='rounded-3xl btn btn-outline btn-sm'>
            <IoVideocamOutline />
            방송하기
          </button>
          <button className='btn btn-outline btn-sm rounded-3xl'>
            <IoSettingsOutline />
            채널관리
          </button>
        </div>
      </div>

      <ul className='flex items-center justify-center text-lg font-bold gap-x-7'>
        <li className='relative'>
          <Link to={'studio-set'}>
            <button>스튜디오 관리</button>
          </Link>
          {studioSetMatch && (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 w-3 h-3 m-auto bg-red-700 rounded-full -bottom-3'
            ></motion.div>
          )}
        </li>
        <li className='relative'>
          <Link to={'channel-set'}>
            <button>내 채널 설정</button>
          </Link>
          {channelSetMatch && (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 w-3 h-3 m-auto bg-red-700 rounded-full -bottom-3'
            ></motion.div>
          )}
        </li>
        <li className='relative'>
          <button>후원 관리</button>
          {/* <motion.div className='absolute left-0 right-0 w-full h-1 m-auto bg-red-700 rounded-full -bottom-3'></motion.div> */}
        </li>
        <li className='relative'>
          <button>내가 구독한 채널</button>
          {/* <motion.div className='absolute left-0 right-0 w-full h-1 m-auto bg-red-700 rounded-full -bottom-3'></motion.div> */}
        </li>
        <li className='relative'>
          <button>기타 설정</button>
          {/* <motion.div className='absolute left-0 right-0 w-full h-1 m-auto bg-red-700 rounded-full -bottom-3'></motion.div> */}
        </li>
      </ul>

      <div className='my-12 divider'></div>

      <Outlet />
    </div>
  );
}
