import { useEffect, useState, useRef } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import { CHAT_END_POINT } from '../constants/constant';
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import { IChatHistory } from '../types/interface';

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [isTalk, setIsTalk] = useState(false);
  const client = useRef<CompatClient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (() => {
      const socket = new SockJS(CHAT_END_POINT);
      client.current = Stomp.over(() => socket);

      client.current.connect({}, () => {
        client.current?.subscribe(`/sub/room/${id}`, (msg) => {
          console.log(msg.body);
          setChatHistory((prev) => [...prev, JSON.parse(msg.body)]);
        });
      });
    })();

    // return () => client.current?.unsubscribe(id!); // 이게 맞나?
  }, [id]);

  const sendMessage = (message: string) => {
    if (message === '') return;
    if (client.current && client.current.connected) {
      client.current.send(
        `/pub/message`,
        {},
        JSON.stringify({
          messageType: isTalk ? 'TALK' : 'ENTER',
          streamingId: id,
          senderId: 34,
          message,
        }),
      );
    }
    setIsTalk(true);
  };

  return (
    <div className='flex flex-col border-2 h-[90%] sm:w-full lg:w-auto'>
      <ChatList chats={chatHistory} />
      <ChatForm value={msg} onChange={setMsg} onSendMsg={sendMessage} />
    </div>
  );
}
