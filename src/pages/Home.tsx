import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { filterAndSortedStreamerByKeyword } from '../utils/filterAndSortedStreamerByKeyword';

interface StreamingData {
  id: number;
  user_id: string;
  title: string;
  category: string;
  start_at: string;
  viewer_count: number;
  transmission_method: string;
  created_at: string;
  modified_at: string;
}

interface StreamingListArray extends Array<StreamingData> {}

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

const fetchData = async () => {
  const response = await axios.get('/data/live-streaming.json');
  return response.data as StreamingListArray;
};

const fetchPage = async (page: number): Promise<Page> => {
  const pageSize = 8;
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;

  const fetchDataList = await fetchData();
  const currentPage = fetchDataList.slice(startIdx, endIdx);
  const nextPage = endIdx < fetchDataList.length ? page + 1 : null;

  return {
    data: currentPage,
    nextCursor: nextPage ? nextPage : null,
  };
};

export default function Home() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['myInfiniteQuery'],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  // 카테고리 혹은 키워드 검색 시 리스트가 8개 이하인데도
  // 페이지 단위로 데이터를 불러오기때문에 더보기 버튼을 눌러야 추가로 필터링된 리스트가 나오는 문제점이 있음
  // API 에 카테고리 및 키워드 별 데이터 요청 만들어달라고 해야하나?
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
    filteredLiveStreamingList = filterAndSortedStreamerByKeyword(
      filteredLiveStreamingList,
      streamerName,
    );
  }

  return (
    <div className='flex w-5/6 ml-[17%]'>
      <div className='flex flex-col items-start h-full'>
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
          {hasNextPage && (
            <button className='border-2' onClick={() => fetchNextPage()}>
              더 보기
            </button>
          )}
        </div>
      </div>
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
