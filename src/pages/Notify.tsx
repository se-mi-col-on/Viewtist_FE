import { useRecoilState } from 'recoil';
import { notifyList } from '../store';

export default function Notify() {
  const [streamerList, setStreamerList] = useRecoilState(notifyList);

  return (
    <div className='flex items-center w-2/3 border-2'>
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
            {streamerList.map((streamerName: string) => (
              <NotifyItems streamerName={streamerName} key={streamerName} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const NotifyItems = ({ streamerName }: { streamerName: string }) => {
  return (
    <tr>
      <th></th>
      <td>
        <div className='flex items-center justify-center gap-3'>
          <div className='avatar'>
            <div className='w-12 h-12 mask mask-squircle'>
              사진
              {/* <img src={} alt='Avatar Tailwind CSS Component' /> */}
            </div>
          </div>
          <div>
            <div className='font-bold'>{streamerName}</div>
          </div>
        </div>
      </td>
      <td>{streamerName}님이 방송을 시작하셨습니다.</td>
    </tr>
  );
};
