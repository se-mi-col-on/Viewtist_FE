import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoggedIn } from '../store';
import axios from 'axios';
import { KAKAO_AUTH_URL, KAKAO_IMG_URL } from '../constants/constant';

export default function SignIn() {
  const [email, setEmail] = useState('ehdgns8339@naver.com');
  const [password, setpassword] = useState('azsxdc123123');

  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoggedIn);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { accessToken, refreshToken } = await axios
        .post(`/api/api/users/signin`, {
          email,
          password,
        })
        .then((res) => res.data);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsLogin(true);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-2/3 h-[40rem] gap-y-5'>
      <h1 className='text-center sm:text-xl md:text-3xl'>로그인</h1>
      <div className='flex flex-col gap-y-5'>
        <form onSubmit={handleLogin} className='flex flex-col justify-center gap-y-5'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='floating_id'
              id='floating_id'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <label
              htmlFor='floating_id'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              아이디
            </label>
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='password'
              name='floating_password'
              id='floating_password'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              value={password}
              onChange={(e) => setpassword(e.currentTarget.value)}
            />
            <label
              htmlFor='floating_password'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Password
            </label>
          </div>

          <button className='text-white btn btn-success'>로그인</button>
        </form>
        <div className='flex justify-center w-full sm:text-[10px] md:text-sm'>
          <button>비밀번호 찾기</button>
          <div className='divider divider-horizontal divider-success'></div>
          <button>아이디 찾기</button>
          <div className='divider divider-horizontal divider-success'></div>
          <Link to={'/sign-up'}>
            <button>회원가입</button>
          </Link>
        </div>

        <a href={KAKAO_AUTH_URL}>
          <button className='flex justify-center items-center w-full px-2 py-1 m-auto sm:text-xs md:text-sm lg:text-sm text-black bg-[rgb(250,228,7)]  rounded-lg gap-x-3 border-slate-400'>
            <img src={KAKAO_IMG_URL} alt='logo' className='w-5 h-5' />
            <span>카카오 계정으로 로그인</span>
          </button>
        </a>
      </div>
    </div>
  );
}
