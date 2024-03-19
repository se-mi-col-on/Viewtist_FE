import { useParams } from 'react-router-dom';
import StreamVideo from '../components/StreamVideo';
import { useStreamServer } from '../utils/streaming/useStreamServer';
import { useStreamDetail } from '../utils/streaming/useStreamDetail';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '../store';
import { deleteStreaming } from '../api';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
const testUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function StreamingLive() {
  const navigate = useNavigate();
  const streamServer = useStreamServer();
  const { id } = useParams();
  const { data, isLoading } = useStreamDetail(id);
  const [streamDetail, setStreamDetail] = useState(data);

  const userInfo = useRecoilValue(currentUserInfo);
  const isAuthor = streamDetail?.streamerNickname === userInfo.nickname;

  useEffect(() => {
    setStreamDetail(data);
  }, [data]);

  const handleDeleteStreamClick = async () => {
    const result = confirm('정말 스트리밍을 종료하시겠습니까?');
    if (result) {
      await deleteStreaming(id);
      navigate('/');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex justify-center w-full h-screen lg:items-start flex-grow-1 sm:flex-col sm:items-center lg:flex-row bg-base-200'>
      <div className='flex flex-col lg:w-2/3 lg:h-[90%] sm:w-full'>
        <div className='flex items-center justify-center border-2 h-5/6'>
          <StreamVideo src={streamServer} type='m3u8' />
        </div>
        <div className='flex flex-col gap-2 p-2 border-2 lg:h-1/6'>
          <p className='text-2xl sm:text-lg'>{streamDetail?.title}</p>
          <div className='flex items-center justify-between pl-2 pr-2'>
            <div className='flex gap-4'>
              <div className='avatar'>
                <div className='rounded-full md:w-16 sm:w-14'>
                  <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
                </div>
              </div>
              <div>
                <p className='text-orange-600 sm:text-sm'>{streamDetail?.streamerNickname}</p>
                <p className='text-amber-400 sm:text-sm'>{streamDetail?.category}</p>
                <p className='text-lime-400 sm:text-sm'>1,456명 시청 중</p>
              </div>
            </div>
            <div className='flex gap-2'>
              {isAuthor ? (
                <>
                  <button
                    className='btn btn-active btn-secondary btn-sm'
                    onClick={() => document.getElementById('my_modal_4').showModal()}
                  >
                    설정
                  </button>
                  <button className='btn btn-success btn-sm' onClick={handleDeleteStreamClick}>
                    방송종료
                  </button>
                </>
              ) : (
                <button className='btn btn-active btn-secondary btn-sm'>구독</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col border-2 h-[90%] sm:w-full lg:w-auto'>
        <div className='flex items-center justify-center h-5/6 '>실시간 채팅 영역</div>
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
      <Modal streamId={id} />
    </div>
  );
}
