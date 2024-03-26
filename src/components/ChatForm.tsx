import { Dispatch, SetStateAction } from 'react';

interface IChatForm {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSendMsg: (message: string) => void;
}

export default function ChatForm({ onChange, value, onSendMsg }: IChatForm) {
  const handleSubmitChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendMsg(value);
    onChange('');
  };
  return (
    <form onSubmit={handleSubmitChat} className='flex flex-col gap-2 p-3'>
      <input
        type='text'
        placeholder='채팅을 입력해주세요'
        className='w-full input input-bordered'
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <div className='flex justify-end'>
        <button className='btn btn-xs btn-primary'>채팅</button>
      </div>
    </form>
  );
}
