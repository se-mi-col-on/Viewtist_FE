import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
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
    <div className='flex items-center justify-between w-full p-3 border-2'>
      <div className='flex items-center gap-x-2'>
        <Drawer />
        <Link to={'/'}>
          <button className='p-3 rounded-lg btn-ghost'>Viewtist</button>
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

        {isLogIn && (
          <Link to={'profile/studio-set'}><div className='avatar'>
          <div className='rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
          </div>
        </div></Link>
        )}
      </div>
    </div>
  );
}

const Drawer = () => {
  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        <label htmlFor='my-drawer' className='btn btn-ghost drawer-button'>
          <GiHamburgerMenu />
        </label>
      </div>
      <div className=' drawer-side'>
        <label htmlFor='my-drawer' aria-label='close sidebar' className=' drawer-overlay'></label>
        <ul className='h-full p-4 overflow-y-hidden menu w-80 bg-base-200'>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
