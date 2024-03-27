import { IChatHistory } from '../types/interface';

export default function ChatList({ chats }: { chats: IChatHistory[] }) {
  return (
    <ul className='flex flex-col-reverse overflow-y-auto h-5/6 '>
      <div className='flex flex-col p-3 gap-y-2'>
        {chats?.map((chat, index) => (
          <li key={index}>
            <span className='mr-3 text-pink-300'>{chat.nickname}</span>
            <span>{chat.message}</span>
          </li>
        ))}
      </div>
    </ul>
  );
}
