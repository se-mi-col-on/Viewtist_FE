export default function Drawer() {
  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        <label htmlFor='my-drawer' className='btn btn-primary drawer-button'>
          Open drawer
        </label>
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
        <ul className='w-1/6 min-h-full p-4 border-2 menu bg-base-100 text-base-content'>
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
}
