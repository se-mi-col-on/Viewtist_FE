import { useMutation, useQuery } from '@tanstack/react-query';
import { getSubscribeList, addSubscribe, deleteSubscribe } from '../api';
import { IProfile, ISubscribeList } from '../types/interface';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

//json-server --watch db.json --port 3001

export default function Subscriptions() {
  const contextData: IProfile = useOutletContext();
  console.log(contextData);
  const { data, isLoading, isError } = useQuery<ISubscribeList[]>({
    queryKey: ['subscribe-list'],
    queryFn: () => getSubscribeList(contextData.nickname),
  });

  if (isLoading)
    return (
      <div className='flex items-center justify-center'>
        <span className=' loading loading-dots loading-lg'></span>
      </div>
    );
  if (isError) return <h1>error...</h1>;
  return (
    <div className='border-2 rounded-lg border-slate-500'>
      <ul className='max-w-md m-auto divide-y divide-gray-200 dark:divide-gray-700'>
        {data?.map((item) => <SubscriptionListItem key={item.streamerNickname} {...item} />)}
      </ul>
    </div>
  );
}

const SubscriptionListItem = (props: ISubscribeList) => {
  console.log(props);
  const [isSubscribe, setIsSubscribe] = useState(true);

  const { mutate: addFn } = useMutation({
    mutationFn: () => addSubscribe(props.streamerNickname),
  });

  const { mutate: removeFn } = useMutation({
    mutationFn: () => deleteSubscribe(props.streamerNickname),
  });

  const subscribe = () => {
    console.log('구독' + props.streamerNickname);
    addFn();
    setIsSubscribe(true);
  };

  const cancelSubscribe = () => {
    console.log('구독취소' + props.streamerNickname);
    removeFn();
    setIsSubscribe(false);
  };

  return (
    <li className='py-3 sm:py-4'>
      <div className='flex items-center space-x-4 rtl:space-x-reverse'>
        <div className='flex-shrink-0'>
          <img className='w-8 h-8 rounded-full' src={props.profilephotoURL} alt='Neil image' />
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium '>{props.streamerNickname}</p>
        </div>
        <div className='inline-flex items-center text-base font-semibold'>
          {isSubscribe ? (
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
    </li>
  );
};
