export default function Modal() {
  return (
    <dialog id='my_modal_4' className='modal'>
      <div className='w-11/12 max-w-5xl modal-box'>
        <h3 className='text-lg font-bold'>Hello!</h3>
        <p className='py-4'>Click the button below to close</p>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
