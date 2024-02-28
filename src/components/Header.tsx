import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { isLoggedIn } from './../store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLogIn, setIsLogIn] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();

  const handleAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerText === '로그인') {
      navigate('sign-in');
      return;
    } else {
      setIsLogIn(false);
      return;
    }
  };
  return (
    <div className='fixed top-0 left-0 z-10 flex items-center justify-between w-full p-3 bg-base-100 '>
      <div className='flex items-center justify-center w-1/6 gap-x-2'>
        <Link to={'/'}>
          <button className='p-3 rounded-lg btn-wide'>Viewtist</button>
        </Link>
      </div>
      <label className='flex items-center w-1/4 gap-2 rounded-full input input-bordered input-success '>
        <input type='text' className='grow' placeholder='스트리머 검색' />
        <CiSearch className='text-xl' />
      </label>

      <div className='flex items-center cursor-pointer gap-x-5'>
        <button onClick={handleAuthClick} className='btn btn-outline btn-sm'>
          {isLogIn ? '로그아웃' : '로그인'}
        </button>

        {/* {isLogIn ? (
          <DropDown />
        ) : (
          <Link to={'sign-in'}>
            <button className='btn btn-outline btn-sm'>로그인</button>
          </Link>
        )} */}
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
