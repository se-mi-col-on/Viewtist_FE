import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    // <div className="flex h-full">
    //   <Sidebar />
    //   <div className="w-full h-full">
    //     <Header />
    //     <Outlet />
    //   </div>
    // </div>

    <>
      <Header />
      <div className='flex mt-32'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
