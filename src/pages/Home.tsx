import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { filterStreamer } from '../utils/filterStreamer';
import { StreamingData } from '../types/interface';
import { getLiveStreamingList } from '../api';

interface CardProps {
  title: string;
  category: string;
  viewer_count: number;
  user_id: string;
}

interface Page {
  data: StreamingData[];
  nextCursor?: number | null;
}

const fetchPage = async (page: number): Promise<Page> => {
  const pageSize = 8;
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;

  const fetchDataList = await getLiveStreamingList();
  const currentPage = fetchDataList.slice(startIdx, endIdx);
  const nextPage = endIdx < fetchDataList.length ? page + 1 : null;

  return {
    data: currentPage,
    nextCursor: nextPage ? nextPage : null,
  };
};

//json-server --watch db.json --port 3001

export default function Home() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['myInfiniteQuery'],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const flattenArray = (arr: Array<Page>) => arr.flatMap((obj) => obj.data);
  const liveStreamingList = data ? flattenArray(data.pages) : [];

  const { categoryName } = useParams<{ categoryName: string }>();
  const { streamerName } = useParams<{ streamerName: string }>();

  let filteredLiveStreamingList = liveStreamingList;

  if (categoryName && categoryName !== 'all') {
    filteredLiveStreamingList = liveStreamingList?.filter(
      ({ category }) => category === categoryName,
    );
  }
  if (streamerName) {
    filteredLiveStreamingList = filterStreamer(filteredLiveStreamingList, streamerName);
  }

  return (
    <div className='flex flex-col items-center gap-4 p-3'>
      <p className='text-2xl'>현재 스트리밍 중인 채널</p>
      <div className='p-3'>
        <div className='grid grid-cols-4 gap-6'>
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
      {hasNextPage && (
        <button className='btn btn-outline' onClick={() => fetchNextPage()}>
          더 보기
        </button>
      )}
    </div>
  );
}

const Card: React.FC<CardProps> = ({ title, category, viewer_count, user_id }) => {
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
