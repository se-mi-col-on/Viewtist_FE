import { useEffect, useState, useRef } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import { IChatHistory } from '../types/interface';
import axios from 'axios';
import { useMyPage } from '../utils/channelSetting/useMyPage';

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [isTalk, setIsTalk] = useState(false);
  const client = useRef<CompatClient | null>(null);
  const { id } = useParams();
  const { data: myInfo, isLoading } = useMyPage();

  useEffect(() => {
    (() => {
      const socket = new SockJS(import.meta.env.VITE_CHAT_END_POINT);
      client.current = Stomp.over(() => socket);

      const getPrevChat = async () => {
        const res = (await axios.get(`/chat/api/chat/${id}`)).data;
        setChatHistory((prev) => [prev, ...res.content.reverse()]);
      };
      getPrevChat();

      client.current.connect({}, () => {
        client.current?.subscribe(`/sub/room/${id}`, (msg) => {
          setChatHistory((prev) => [...prev, JSON.parse(msg.body)]);
        });
      });
    })();
  }, [id]);

  const sendMessage = (message: string) => {
    if (message === '') return;
    if (client.current && client.current.connected) {
      client.current.send(
        `/pub/message`,
        {},
        JSON.stringify({
          messageType: 'TALK',
          streamingId: id,
          nickname: myInfo?.nickname,
          message,
        }),
      );
    }
    setIsTalk(true);
  };

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className='flex flex-col border-2 h-[90%] sm:w-full lg:w-auto'>
      <ChatList chats={chatHistory} isTalk={isTalk} />
      <ChatForm value={msg} onChange={setMsg} onSendMsg={sendMessage} />
    </div>
  );
}
