import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <div className='flex mt-20 '>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
