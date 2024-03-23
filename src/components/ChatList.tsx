import { IChatHistory } from '../types/interface';

export default function ChatList({ chats }: { chats: IChatHistory[] }) {
  return (
    <ul className='flex flex-col items-center justify-center h-5/6 '>
      {chats?.map((chat, index) => (
        <li key={index}>
          <span>{chat.senderId} 번 : </span>
          <span>{chat.message}</span>
        </li>
      ))}
    </ul>
  );
}
