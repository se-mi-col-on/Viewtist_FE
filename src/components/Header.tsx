import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa';
import { IoVideocamOutline } from 'react-icons/io5';

export default function Header() {
  const isLogin: boolean = !!localStorage.getItem('currentUserToken');

  return (
    <div className='flex items-center justify-between w-auto p-3 '>
      <div className='flex items-center justify-center w-1/6 gap-x-2'>
        <Link to={'/'}>
          <button className='p-3 rounded-lg btn-wide'>Viewtist</button>
        </Link>
      </div>
      <div className='w-2/5'>
        <label className='flex items-center gap-2 rounded-full input input-bordered input-success'>
          <input type='text' className='grow' placeholder='스트리머 검색' />
          <CiSearch size='24' />
        </label>
      </div>
      <div className='flex items-center gap-2 p-2'>
        <div className='flex gap-1 p-1 mb-2 rounded-full'>
          <button className='border-none btn btn-outline btn-sm'>
            <IoVideocamOutline size='35' />
          </button>
          <button className='border-none btn btn-outline btn-sm'>
            <FaRegBell size='30' />
          </button>
        </div>
        {isLogin ? (
          <DropDown />
        ) : (
          <Link to={'sign-in'}>
            <button className='btn btn-outline btn-sm'>로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
}

const DropDown = () => {
  return (
    <div className='dropdown dropdown-end'>
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
        <li>
          <div>내 정보</div>
        </li>
        <li>
          <div>내 채널</div>
        </li>
        <li>
          <div>내 구독 리스트</div>
        </li>
        <li>
          <div>설정</div>
        </li>
        <li>
          <div>로그아웃</div>
        </li>
      </ul>
    </div>
  );
};
