import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { GoBell } from 'react-icons/go';
import { IoVideocamOutline } from 'react-icons/io5';
import { isLoggedIn } from './../store';
import ToggleThemeBtn from './ToggleThemeBtn';
import Drawer from './Drawer';

export default function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  );

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

  const handleLogoutClick = () => setIsLogIn(false);
  return (
    <header className='fixed top-0 left-0 z-10 flex items-center justify-between w-full p-3 bg-base-100 '>
      <div className='flex items-center justify-center w-1/6 gap-x-2'>
        <Drawer />
        <Link to={'/'}>
          <button className='p-3 rounded-lg btn-wide'>Viewtist</button>
        </Link>
      </div>
      <form
        className='flex items-center w-1/4 gap-2 rounded-full input input-bordered input-success'
        onSubmit={handleInputSubmit}
      >
        <input
          type='text'
          className='grow'
          placeholder='스트리머 검색'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type='submit'>
          <CiSearch className='text-xl' />
        </button>
      </form>

      <div className='flex items-center cursor-pointer gap-x-5'>
        <ToggleThemeBtn onChange={handleToggle} theme={theme!} />
        {isLogIn ? (
          <>
            <Link to={'streaming/obs_downLoad'}>
              <IoVideocamOutline className='text-xl' />
            </Link>
            <Link to={'notify'}>
              <GoBell className='text-xl hover:text-white' />
            </Link>
            <DropDown onLogoutClick={handleLogoutClick} />
          </>
        ) : (
          <Link to={'sign-in'}>
            <button className='btn btn-outline btn-sm'>로그인</button>
          </Link>
        )}
      </div>
    </header>
  );
}

const DropDown = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  const [version, setVersion] = useState(1);
  return (
    <div className='dropdown dropdown-end' key={version}>
      <div tabIndex={0} role='button' className='m-1'>
        <div className='avatar'>
          <div className='w-10 rounded-full'>
            <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={'channel/muse'}>
            <button className='text-white'>내 채널</button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={'channel/subscriptions'}>
            <button className='text-white'>내 구독 리스트</button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <Link to={'channel-settings'}>
            <button className='text-white'>설정</button>
          </Link>
        </li>
        <li onClick={() => setVersion((prev) => (prev += 1))}>
          <button className='text-white' onClick={onLogoutClick}>
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};
