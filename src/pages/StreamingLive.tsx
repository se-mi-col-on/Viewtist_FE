import StreamVideo from '../components/StreamVideo';
const testUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const myServer = 'http://15.164.226.60:1935/l/hls/test_src.m3u8';

export default function StreamingLive() {
  return (
    <div className='flex flex-col h-[90vh] gap-2 border-2'>
      <div className='flex bg-base-200 h-4/5'>
        <div className='flex items-center justify-center'>
          <StreamVideo src={testUrl} type='m3u8' />
        </div>
        <div className='flex flex-col h-[89.6vh] border-2 bg-base-200'>
          <div className='flex items-center justify-center border-2 h-[71.4vh]'>
            실시간 채팅 영역
          </div>
          <div className='flex flex-col gap-2 p-3'>
            <div>
              <textarea
                className='w-full textarea textarea-bordered'
                placeholder='채팅을 입력하세요.'
              ></textarea>
            </div>
            <div className='flex justify-end'>
              <button className='btn btn-xs btn-primary'>채팅</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-4/5 gap-2 p-2'>
        <p className='md:text-2xl sm:text-lg'>Streaming Title</p>
        <div className='flex items-center justify-between pl-2 pr-2 '>
          <div className='flex gap-4'>
            <div className='avatar'>
              <div className='rounded-full md:w-16 sm:w-14'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
            </div>
            <div>
              <p className='text-orange-600 sm:text-sm'>Streamer Name</p>
              <p className='text-amber-400 sm:text-sm'>Category</p>
              <p className='text-lime-400 sm:text-sm'>1,456명 시청 중</p>
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
