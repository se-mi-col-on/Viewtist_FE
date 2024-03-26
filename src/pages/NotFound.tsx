import { BsEmojiFrown } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='absolute top-0 flex items-center h-screen'>
      <div className='flex items-center sm:gap-x-5 md:gap-x-10'>
        <BsEmojiFrown className='sm:text-5xl md:text-9xl' />
        <div className='flex flex-col justify-around gap-y-3'>
          <h1 className='sm:text-2xl md:text-7xl'>404 ERROR</h1>
          <p className='sm:text-base md:text-3xl'>페이지를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')} className='sm:btn-sm md:btn-md btn btn-outline'>
            <IoHomeOutline />
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}
