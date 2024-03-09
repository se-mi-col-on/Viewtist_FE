import { useMutation, useQuery } from '@tanstack/react-query';
import { addSubscribe, getsubscribeList, removeSubscribe } from '../api';
import { ISubscribeList } from '../types/interface';
import { useState } from 'react';

//json-server --watch db.json --port 3001

export default function Subscriptions() {
  const { data, isLoading, isError } = useQuery<ISubscribeList[]>({
    queryKey: ['subscribe-list'],
    queryFn: getsubscribeList,
  });

  if (isLoading)
    return (
      <div className='flex items-center justify-center'>
        <span className=' loading loading-dots loading-lg'></span>
      </div>
    );
  if (isError) return <h1>error...</h1>;
  return (
    <div className='border-2 '>
      <ul className='max-w-md m-auto divide-y divide-gray-200 dark:divide-gray-700'>
        {data?.map((item) => <SubscriptionListItem key={item.id} {...item} />)}
      </ul>
    </div>
  );
}

const SubscriptionListItem = (props: ISubscribeList) => {
  const [isSubscribe, setIsSubscribe] = useState(true);

  const { mutate: addFn } = useMutation({
    mutationFn: addSubscribe,
  });

  const { mutate: removeFn } = useMutation({
    mutationFn: (id: number) => removeSubscribe(id),
  });

  const subscirbe = () => {
    console.log('구독' + props.name);
    addFn(props);
    setIsSubscribe(true);
  };

  const cancelSubscribe = (id: number) => {
    console.log('구독취소' + props.name);
    removeFn(id);
    setIsSubscribe(false);
  };

  return (
    <li className='py-3 sm:py-4'>
      <div className='flex items-center space-x-4 rtl:space-x-reverse'>
        <div className='flex-shrink-0'>
          <img
            className='w-8 h-8 rounded-full'
            src='https://item.kakaocdn.net/do/e884bc5c959213e5ac28c250e35f552a9f17e489affba0627eb1eb39695f93dd'
            alt='Neil image'
          />
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium '>{props.name}</p>
        </div>
        <div className='inline-flex items-center text-base font-semibold'>
          {isSubscribe ? (
            <button
              onClick={() => cancelSubscribe(props.id)}
              className='btn btn-outline btn-error btn-sm'
            >
              구독 취소
            </button>
          ) : (
            <button onClick={subscirbe} className='btn btn-outline btn-success btn-sm'>
              구독하기
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
