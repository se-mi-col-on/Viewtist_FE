import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type StreamingData = {
  id: number;
  user_id: string;
  title: string;
  category: string;
  start_at: string;
  viewer_count: number;
  transmission_method: string;
  created_at: string;
  modified_at: string;
};

type StreamingListArray = StreamingData[];

type CardProps = {
  title: string;
  category: string;
  viewer_count: number;
  user_id: string;
};

const fetchData = async () => {
  const response = await axios.get('/data/live-streaming.json');
  return response.data as StreamingListArray;
};

export default function Home() {
  const {
    data: liveStreamingList,
    isLoading,
    error,
  } = useQuery<StreamingListArray>({
    queryKey: ['liveStreamingList'],
    queryFn: fetchData,
  });
  const { categoryName } = useParams<{ categoryName: string }>();

  const filteredLiveStreamingList =
    categoryName !== 'all' && categoryName !== undefined
      ? liveStreamingList?.filter(({ category }) => category === categoryName)
      : liveStreamingList;

  return (
    <div className='flex flex-col items-start w-5/6 h-full'>
      <div className='flex flex-col h-full gap-2 p-3'>
        <p>현재 스트리밍 중인 채널</p>
        <div className='flex flex-wrap h-full gap-4 p-3'>
          {filteredLiveStreamingList?.map(({ id, title, category, viewer_count, user_id }) => (
            <Card
              key={id}
              title={title}
              category={category}
              viewer_count={viewer_count}
              user_id={user_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, category, viewer_count, user_id }: CardProps) => {
  return (
    <div className='shadow-xl card w-80 bg-base-100'>
      <figure>
        <img
          className='object-cover h-48 w-96'
          src='https://via.placeholder.com/300x200.jpg'
          alt='스트리밍 화면'
        />
      </figure>
      <div className='flex items-start gap-4 p-2'>
        <div className='avatar'>
          <div className='w-12 rounded-full'>
            <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
          </div>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <p className='text-amber-200'>{user_id}</p>
          <p className='font-extrabold'>{title}</p>
        </div>
        <div className='flex flex-col gap-1 ml-auto mr-3'>
          <button className='btn btn-xs'>{category}</button>
          <button className='btn btn-xs'>{viewer_count} 명 시청</button>
        </div>
      </div>
    </div>
  );
};
