import Submenu from './Submenu';

export default function Sidebar() {
  return (
    <div className='fixed w-1/6 h-full'>
      <div className='flex flex-col'>
        <button className='border-none btn btn-active bg-base-100'>Quick Menu Bar</button>
        <Submenu />
      </div>
    </div>
  );
}
