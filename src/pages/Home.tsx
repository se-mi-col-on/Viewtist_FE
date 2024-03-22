import { useInfiniteQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
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
import thumbnailDefault from '../assets/thumbnail_default.jpg';

interface CardProps {
  title: string;
  category: string;
  viewerCount: number;
  streamerNickname: string;
  profilePhotoUrl: string;
  thumbnail: string;
}

interface Page {
  data: StreamingData[];
  nextCursor?: number | null;
}

//json-server --watch db.json --port 3001

export default function Home() {
  const { data: userInfo } = useMyPage();
  const setCurrentUserInfo = useSetRecoilState(currentUserInfo);
  const { categoryName, streamerName } = useParams<{
    categoryName: string;
    streamerName: string;
  }>();

  useEffect(() => {
    setCurrentUserInfo(userInfo);
  }, [userInfo, setCurrentUserInfo]);

  const fetchPage = async (
    page: number,
    category: string | undefined,
    streamer: string | undefined,
  ): Promise<Page> => {
    let result;
    if (category && category !== 'all') {
      result = await getLiveStreamingCategoryList(page, category);
    } else if (streamer) {
      result = await getLiveStreamingKeywordList(page, streamer);
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

  // 초기 queryKey 설정
  const initialQueryKey = useMemo(() => {
    if (categoryName && categoryName !== 'all') {
      return ['myInfiniteQuery', categoryName];
    } else if (streamerName) {
      return ['myInfiniteQuery', streamerName];
    }
    return ['myInfiniteQuery'];
  }, [categoryName, streamerName]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: initialQueryKey,
    queryFn: ({ pageParam }) => fetchPage(pageParam, categoryName, streamerName),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval: 60000,
  });

  const flattenArray = (arr: Array<Page>) => arr.flatMap((obj) => obj.data);
  const liveStreamingList = data ? flattenArray(data.pages) : [];

  return (
    <div className='flex flex-col items-center gap-4 p-3'>
      <p className='text-2xl'>현재 스트리밍 중인 채널</p>
      <div className='p-3'>
        <div className='grid grid-cols-3 gap-3 transition-all xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
          {liveStreamingList?.map(
            ({
              id,
              title,
              category,
              profilePhotoUrl,
              streamerNickname,
              viewerCount,
              thumbnail,
            }) => (
              <Link key={id} to={`/streaming/live/${id}`}>
                <Card
                  title={title}
                  category={category}
                  viewerCount={viewerCount}
                  streamerNickname={streamerNickname}
                  profilePhotoUrl={profilePhotoUrl}
                  thumbnail={thumbnail}
                />
              </Link>
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
  thumbnail,
}) => {
  const toBinaryIMG = Uint8Array.from(atob(thumbnail), (c) => c.charCodeAt(0));
  const file = new Blob([toBinaryIMG], { type: 'image/png' });
  const thumbnailUrl = URL.createObjectURL(file);

  // 브라우저 메모리 누수를 방지하기 위해 thumbnail이 바뀌면 해당 URL 해지하기
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(thumbnailUrl);
    };
  }, [thumbnailUrl]);

  return (
    <div className='shadow-xl card min-w-[15rem] max-w-[20rem] bg-base-100'>
      <figure>
        <img
          className='object-cover h-48 w-96'
          src={thumbnail ? thumbnailUrl : thumbnailDefault}
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
