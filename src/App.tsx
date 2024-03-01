import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <div className='flex mt-20 '>
        <Sidebar />
        <div className='w-5/6 ml-auto overflow-x-hidden'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
