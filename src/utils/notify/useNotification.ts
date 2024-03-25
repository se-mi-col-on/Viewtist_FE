import { useState, useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '../../store';

const NOTIFY_URL = '/live/api/notify/connect';

export function useNotification() {
  const [notifyList, setNotifyList] = useState<string[]>([]);
  const { nickname } = useRecoilValue(currentUserInfo);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(NOTIFY_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connection: 'keep-alive',
        Accept: 'text/event-stream',
      },
      heartbeatTimeout: 86400000, //  연결 시간 24시간으로 설정
    });

    eventSource.onopen = (event) => {
      if (event.status === 200) {
        console.log('SSE 연결 성공');
      } else {
        console.log('SSE 연결 실패');
      }
    };

    eventSource.addEventListener('STREAMING', (event) => {
      const newMessage = JSON.parse(event.data).content.split(' ')[0];
      setNotifyList((prevList) => [newMessage, ...prevList]);
    });

    eventSource.onerror = (event) => {
      eventSource.close();
      console.error(event);
    };

    return () => {
      eventSource.close();
      console.log('SSE 연결 종료');
    };
  }, [nickname]);

  return notifyList;
}
