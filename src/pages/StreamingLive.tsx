export default function StreamingLive() {
  return (
    <div className='h-screen'>
      <div className='flex bg-base-200 h-3/4'>
        <div className='flex items-center justify-center w-4/5 border-2'>
          라이브 스트리밍 화면 영역
        </div>
        <div className='flex flex-col w-1/5 h-screen border-2 bg-base-200'>
          <div className='flex items-center justify-center w-full h-3/4'>실시간 채팅 영역</div>
          <div className='flex flex-col gap-2 p-3 border-2 h-1/4'>
            <div>
              <textarea className='w-full textarea textarea-bordered' placeholder='Bio'></textarea>
            </div>
            <div className='flex justify-end'>
              <button className='btn btn-xs btn-primary'>채팅</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-4/5 gap-2 p-2 border-2 h-1/4'>
        <p className='text-2xl'>Streaming Title</p>
        <div className='flex items-center justify-between pl-2 pr-2 border-2'>
          <div className='flex gap-4'>
            <div className='avatar'>
              <div className='w-16 rounded-full'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
            </div>
            <div>
              <p className='text-orange-600'>Streamer Name</p>
              <p className='text-amber-400'>Category</p>
              <p className='text-lime-400'>1,456명 시청 중</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <button className='btn btn-active btn-secondary btn-sm'>구독</button>
            <button className='btn btn-success btn-sm'>후원</button>
          </div>
        </div>
      </div>
    </div>
  );
}
