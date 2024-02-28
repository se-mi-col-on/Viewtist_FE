import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

export default function SignIn() {
  const [id, setId] = useState('kminchelle');
  const [pw, setPw] = useState('0lelplR');
  return (
    <div className='flex flex-col justify-center p-3 px-3 m-auto border-2 rounded-lg sm:w-full md:w-1/2 lg:w-1/4 h-96 gap-y-5'>
      <h1 className='text-center sm:text-xl md:text-3xl'>로그인</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios
              .post(
                `https://dummyjson.com/auth/login`,
                {
                  username: id,
                  password: pw,
                },
                {
                  headers: { 'Content-Type': 'application/json' },
                },
              )
              .then((res) => res.data);
            console.log(res);
          } catch (e) {
            console.log(e);
          }
        }}
        className='flex flex-col justify-center gap-y-5'
      >
        <label className='flex items-center gap-2 input input-bordered'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
          />
        </label>
        <label className='flex items-center gap-2 input input-bordered'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd'
            />
          </svg>
          <input
            type='password'
            className='grow'
            placeholder='비밀번호'
            value={pw}
            onChange={(e) => setPw(e.currentTarget.value)}
          />
        </label>
        <button className='text-white btn btn-success'>로그인</button>
      </form>

      <div className='flex justify-center w-full sm:text-[12px] text-sm '>
        <button>비밀번호 찾기</button>
        <div className='divider divider-horizontal divider-success'></div>
        <button>아이디 찾기</button>
        <div className='divider divider-horizontal divider-success'></div>
        <Link to={'/sign-up'}>
          <button>회원가입</button>
        </Link>
      </div>

      <button className='flex justify-center items-center sm:w-full md:w-3/4 px-2 py-1 m-auto text-sm text-black bg-white border-2 rounded-lg gap-x-3 border-slate-400 hover:bg-[rgba(255,255,255,.8)]'>
        <FcGoogle className='text-xl' />
        <span>구글 계정으로 로그인</span>
      </button>
    </div>
  );
}
