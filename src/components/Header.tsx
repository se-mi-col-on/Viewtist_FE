import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { IoVideocamOutline } from 'react-icons/io5';
import { isLoggedIn, currentUserInfo, notifyList } from './../store';
import ToggleThemeBtn from './ToggleThemeBtn';
import Drawer from './Drawer';
import { CiSearch } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { useMyPage } from '../utils/channelSetting/useMyPage';
import { useNotification } from '../utils/notify/useNotification';

export default function Header() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  );
  const notificationList = useNotification();
  const setNotifyList = useSetRecoilState(notifyList);

  useEffect(() => {
    setNotifyList(notificationList);
  }, [notificationList, setNotifyList]);

  useEffect(() => {
    localStorage.setItem('theme', theme!);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html')?.setAttribute('data-theme', localTheme!);
  }, [theme]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const setUserInfo = useSetRecoilState(currentUserInfo);
  const [isLogIn, setIsLogIn] = useRecoilState(isLoggedIn);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) navigate(`/search/${inputValue}`);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken'), localStorage.removeItem('refreshToken');
    setUserInfo({});
    setNotifyList([]);
    setIsLogIn(false);
    navigate('/sign-in');
  };
  return (
    <header className='fixed top-0 left-0 z-10 flex items-center justify-between w-full px-1 py-3 bg-base-100'>
      <div className='flex items-center justify-center'>
        <Drawer />
        <Link to={'/'} className='block '>
          <button>Viewtist</button>
        </Link>
      </div>
      <form onSubmit={handleInputSubmit} className='w-1/3 sm:hidden md:block'>
        <label className='flex items-center gap-2 input input-bordered rounded-xl'>
          <input
            type='text'
            className='grow'
            placeholder='스트리머 검색'
            value={inputValue}
            onChange={handleInputChange}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </form>

      <div className='flex items-center justify-center cursor-pointer sm:gap-x-2 md:gap-x-5 shrink-0'>
        <div className='items-center sm:flex md:hidden gap-x-2'>
          <form onSubmit={handleInputSubmit}>
            <motion.input
              animate={{ scaleX: isOpenSearch ? 1 : 0 }}
              className=' origin-top-right min-[320px]:w-20 min-[375px]:w-28 border-2 rounded-lg px-2 py-1 text-sm placeholder:text-sm'
              placeholder='스트리머 검색'
              value={inputValue}
              onChange={handleInputChange}
            />
          </form>
          <CiSearch
            className='text-xl font-bold '
            onClick={() => setIsOpenSearch((prev) => !prev)}
          />
        </div>
        <ToggleThemeBtn onChange={handleToggle} theme={theme!} />
        {isLogIn ? (
          <>
            <Link to={'streaming/obs_downLoad'}>
              <IoVideocamOutline className='text-xl' />
            </Link>
            <DropDown onLogoutClick={handleLogoutClick} />
          </>
        ) : (
          <Link to={'sign-in'}>
            <button className='btn btn-outline sm:btn-xs md:btn-sm'>로그인</button>
          </Link>
        )}
      </div>
    </header>
  );
}

const DropDown = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  const [version, setVersion] = useState(1);

  const { data: myInfo, isLoading } = useMyPage();
  const notifyLength = useRecoilValue(notifyList).length;

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className='dropdown dropdown-end' key={version}>
      <div tabIndex={0} role='button' className='m-1'>
        <div className='flex avatar'>
          <div className='rounded-full w-7'>
            <img src={myInfo?.profilePhotoUrl} />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={'notify'}>
            <button className='flex items-center justify-center gap-2 text-white'>
              <p>알람</p>
              <p className='text-xs indicator-item badge badge-error'>{notifyLength}</p>
            </button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={`channel/${myInfo?.nickname}`}>
            <button>내 채널</button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={`channel/${myInfo?.nickname}/subscriptions`}>
            <button>내 구독 리스트</button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={'channel-settings'}>
            <button>설정</button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <button onClick={onLogoutClick}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
};
