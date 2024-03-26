import Submenu from './Submenu';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Drawer() {
  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label htmlFor='my-drawer' className='btn btn-ghost drawer-button'>
          <GiHamburgerMenu />
        </label>
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
        <Submenu />
      </div>
    </div>
  );
}
