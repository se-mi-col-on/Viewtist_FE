import { useRecoilState } from 'recoil';
import { notifyList } from '../store';
import { getLiveStreamingAllList } from '../api';
import { useEffect, useState } from 'react';
import { StreamingData } from '../types/interface';
import { useNavigate } from 'react-router-dom';

export default function Notify() {
  const [streamerList, setStreamerList] = useRecoilState(notifyList);
  const [notifyData, setNotifyData] = useState([]);
  console.log(notifyData);

  const handleDeleteNotify = (streamerNickname: string) => {
    const newNicknameList = streamerList.filter(
      (streamer: string) => streamerNickname !== streamer,
    );
    setStreamerList(newNicknameList);
  };

  useEffect(() => {
    const updateNotify = async () => {
      try {
        const allStreamingList = await getLiveStreamingAllList();
        const filteredList = allStreamingList.content.filter(
          ({ streamerNickname }: { streamerNickname: string }) =>
            streamerList.includes(streamerNickname),
        );
        setNotifyData(filteredList);
      } catch (error) {
        console.error(error);
      }
    };
    updateNotify();
  }, [streamerList]);

  return (
    <div className='flex items-center border-2 rounded-lg border-slate-500 sm:w-full md:w-2/3'>
      <div className='w-full overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th></th>
              <th>스트리머</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {notifyData.map((data: StreamingData) => (
              <NotifyItems {...data} key={data.id} onDelete={handleDeleteNotify} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface NotifyProps extends StreamingData {
  onDelete: (streamerNickname: string) => void;
}

const NotifyItems = (props: NotifyProps) => {
  const navigate = useNavigate();
  const handleGoStreaming = () => {
    navigate(`/streaming/live/${props.id}`);
  };

  return (
    <tr>
      <th></th>
      <td>
        <div
          className='flex items-center justify-center gap-3 cursor-pointer'
          onClick={handleGoStreaming}
        >
          <div className='avatar'>
            <div className='w-12 h-12 mask mask-squircle'>
              <img src={props.profilePhotoUrl} alt='Avatar Tailwind CSS Component' />
            </div>
          </div>
          <div>
            <div className='font-bold'>{props.streamerNickname}</div>
          </div>
        </div>
      </td>
      <td>
        <div className='flex items-center justify-center gap-2'>
          <p>{props.streamerNickname}님이 방송을 시작하셨습니다.</p>
          <button
            className='btn btn-circle btn-outline btn-xs'
            onClick={() => props.onDelete(props.streamerNickname)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};
