import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { filterStreamer } from '../utils/filterStreamer';
import { StreamingData } from '../types/interface';
import {
  getLiveStreamingList,
  getLiveStreamingCategoryList,
  getLiveStreamingKeywordList,
} from '../api';
import { useMyPage } from '../utils/channelSetting/useMyPage';
import { currentUserInfo } from '../store';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

interface CardProps {
  title: string;
  category: string;
  viewerCount: number;
  streamerNickname: string;
  profilePhotoUrl: string;
}

interface Page {
  data: StreamingData[];
  nextCursor?: number | null;
}

//json-server --watch db.json --port 3001

export default function Home() {
  const { data: userInfo } = useMyPage();
  const setCurrentUserInfo = useSetRecoilState(currentUserInfo);
  const { categoryName } = useParams<{ categoryName: string }>();
  const { streamerName } = useParams<{ streamerName: string }>();

  useEffect(() => {
    setCurrentUserInfo(userInfo);
  }, [userInfo, setCurrentUserInfo]);

  const fetchPage = async (page: number): Promise<Page> => {
    let result;
    if (categoryName && categoryName !== 'all') {
      result = await getLiveStreamingCategoryList(page, categoryName);
    } else if (streamerName) {
      result = await getLiveStreamingKeywordList(page, streamerName);
    } else {
      result = await getLiveStreamingList(page);
    }

    const currentPage = result.content;
    const nextPage = result.last ? null : page + 1;

    return {
      data: currentPage,
      nextCursor: nextPage,
    };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['myInfiniteQuery'],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const flattenArray = (arr: Array<Page>) => arr.flatMap((obj) => obj.data);
  const liveStreamingList = data ? flattenArray(data.pages) : [];

  let filteredLiveStreamingList = liveStreamingList;

  if (categoryName && categoryName !== 'all') {
    filteredLiveStreamingList = liveStreamingList?.filter(
      ({ category }) => category === categoryName.toUpperCase(),
    );
  }
  if (streamerName) {
    filteredLiveStreamingList = filterStreamer(filteredLiveStreamingList, streamerName);
  }

  return (
    <div className='flex flex-col items-center gap-4 p-3'>
      <p className='text-2xl'>현재 스트리밍 중인 채널</p>
      <div className='p-3'>
        <div className='grid grid-cols-3 gap-3 transition-all xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
          {filteredLiveStreamingList?.map(
            ({ id, title, category, profilePhotoUrl, streamerNickname, viewerCount }) => (
              <Card
                key={id}
                title={title}
                category={category}
                viewerCount={viewerCount}
                streamerNickname={streamerNickname}
                profilePhotoUrl={profilePhotoUrl}
              />
            ),
          )}
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

const Card: React.FC<CardProps> = ({
  title,
  category,
  viewerCount,
  streamerNickname,
  profilePhotoUrl,
}) => {
  return (
    <div className='shadow-xl card min-w-[15rem] max-w-[20rem] bg-base-100'>
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
            <img src={profilePhotoUrl} />
          </div>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <p className='text-amber-200'>{streamerNickname}</p>
          <p className='font-extrabold'>{title}</p>
        </div>
        <div className='flex flex-col gap-1 ml-auto mr-3'>
          <button className='btn btn-xs'>{category}</button>
          <button className='btn btn-xs'>{viewerCount} 명 시청</button>
        </div>
      </div>
    </div>
  );
};
