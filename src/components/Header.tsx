import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Header() {
  return (
    <div className='flex items-center justify-between w-full p-3 border-2'>
      <div className='flex items-center gap-x-2'>
        <Drawer />
        <Link to={'/'}><button className="p-3 rounded-lg btn-ghost">Viewtist</button></Link>
      </div>
      <label className='flex items-center w-1/4 gap-2 rounded-full input input-bordered input-success '>
        <input type='text' className='grow' placeholder='스트리머 검색' />
        <CiSearch className='text-xl' />
      </label>

      <Link to={"sign-in"}>
        <button className="btn btn-outline btn-sm">로그인</button>
      </Link>
    </div>
  );
}

const Drawer = () => {
  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
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