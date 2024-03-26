import { IoVideocamOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, Outlet, useMatch, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserInfo } from '../utils/channelSetting/useUserInfo';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '../store';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addSubscribe, deleteSubscribe, getSubscribeList } from '../api';

export default function Channel() {
  const subscriptionsMatch = useMatch('channel/:name/subscriptions');
  const communityMatch = useMatch('/channel/:name/community');
  const writeMatch = useMatch('/channel/:name/community/write');
  const updateMatch = useMatch('/channel/:name/community/update/:id');
  const detailMatch = useMatch('/channel/:name/community/detail/:id');
  const userInfo = useRecoilValue(currentUserInfo);
  const { name } = useParams();
  const { data, isLoading } = useUserInfo(name!);
  const isAuthor = userInfo?.nickname === data?.nickname;

  const matches = communityMatch || writeMatch || updateMatch || detailMatch;

  const [isSubscribe, setIsSubscribe] = useState<boolean>();

  const { mutate: addFn } = useMutation({
    mutationFn: () => addSubscribe(data.nickname),
  });

  const { mutate: removeFn } = useMutation({
    mutationFn: () => deleteSubscribe(data.nickname),
  });

  const subscribe = () => {
    console.log(data.nickname);
    if (data.nickname) {
      console.log('구독' + data.nickname);
      addFn();
      setIsSubscribe(true);
    }
  };

  const cancelSubscribe = () => {
    if (data.nickname) {
      console.log('구독취소' + data.nickname);
      removeFn();
      setIsSubscribe(false);
    }
  };

  useEffect(() => {
    const checkSubscribe = async (nickname: string) => {
      const subscribeList: { streamerNickname: string }[] = await getSubscribeList(nickname);
      const isAlreadySubscribe = subscribeList.some(
        ({ streamerNickname }) => streamerNickname === name,
      );
      setIsSubscribe(isAlreadySubscribe);
    };

    checkSubscribe(userInfo.nickname);
  }, [userInfo.nickname, name]);

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className='p-3 mt-5 border-2 rounded-lg border-slate-500 sm:w-full min-[750px]:w-2/3'>
      <div className='flex p-3 my-5 sm:flex-col sm:items-center sm:justify-center sm:gap-y-5 md:flex-row md:items-start md:justify-between'>
        <div className='flex items-center gap-x-5'>
          <div className='avatar'>
            <div className='rounded-full w-14 ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src={data?.profilePhotoUrl} />
            </div>
          </div>

          <div>
            <h1 className='mb-1 text-2xl'>{data?.nickname}</h1>
            <span>{data?.channelIntroduction}</span>
          </div>
        </div>

        <div className='flex items-center gap-x-3'>
          {isAuthor ? (
            <>
              <Link to={'/streaming/obs_downLoad'}>
                <button className='rounded-3xl btn btn-outline sm:btn-xs md:btn-sm'>
                  <IoVideocamOutline />
                  방송하기
                </button>
              </Link>
              <Link to={'/channel-settings'}>
                <button className='btn btn-outline sm:btn-xs md:btn-sm rounded-3xl'>
                  <IoSettingsOutline />
                  채널관리
                </button>
              </Link>
            </>
          ) : isSubscribe ? (
            <button onClick={cancelSubscribe} className='btn btn-outline btn-error btn-sm'>
              구독 취소
            </button>
          ) : (
            <button onClick={subscribe} className='btn btn-outline btn-success btn-sm'>
              구독하기
            </button>
          )}
        </div>
      </div>
      <ul className='flex items-center justify-center sm:text-xs sm:gap-x-5 md:text-lg md:gap-x-10'>
        <li className={`relative ${subscriptionsMatch && 'font-extrabold'}`}>
          <Link to={`/channel/${data?.nickname}/subscriptions`}>
            {isAuthor ? (
              <button>내가 구독한 채널</button>
            ) : (
              <button>{data?.nickname}이 구독한 채널</button>
            )}
          </Link>
          {subscriptionsMatch && (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 m-auto bg-red-700 rounded-full sm:w-2 sm:h-2 md:w-3 md:h-3 -bottom-3'
            ></motion.div>
          )}
        </li>
        <li className={`relative ${communityMatch && 'font-extrabold'}`}>
          <Link to={`/channel/${data?.nickname}/community`}>
            <button>공지</button>
          </Link>
          {matches ? (
            <motion.div
              layoutId='indicator'
              className='absolute left-0 right-0 m-auto bg-red-700 rounded-full sm:w-2 sm:h-2 md:w-3 md:h-3 -bottom-3'
            ></motion.div>
          ) : null}
        </li>
      </ul>
      <div className='my-12 divider'></div>
      <Outlet context={{ data, isAuthor }} />
    </div>
  );
}
