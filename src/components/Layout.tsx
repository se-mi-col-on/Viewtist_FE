import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='flex justify-center w-full mt-20 ml-auto overflow-x-hidden'>
      <Outlet />
    </div>
  );
}
