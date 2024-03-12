import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const categoryList = ['노래', '댄스', '작곡', '그림', '사진', '연기', '악기'];

type LiveSet = {
  title: string;
  category: string;
  donation: boolean;
  liveChat: boolean;
  streamUrl: string;
  streamKey: string;
};

export default function StreamingSetting() {
  const navigate = useNavigate();

  const [streamOption, setStreamOption] = useState<LiveSet>({
    title: '',
    category: '',
    donation: false,
    liveChat: false,
    streamUrl: 'rtmp://15.164.226.60:1935/live',
    streamKey: '',
  });

  const isFormInValid = Object.values(streamOption).some((value) => value === '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(streamOption);
    navigate('/streaming/live');
  };
  return (
    <div className='flex flex-col items-center h-full gap-3 p-10 border-2'>
      <p className='text-xl'>라이브 스트리밍 설정</p>
      <form className='flex flex-col w-5/6 gap-5' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex items-center gap-8 p-8 border-2 border-gray-500'>
          <label className='p-2 w-36' htmlFor='title'>
            스트리밍 제목
          </label>
          <div className='w-full'>
            <input
              id='title'
              type='text'
              className='w-full p-3 placeholder-gray-500 border-b-2 border-gray-500 bg-base-100'
              placeholder='스트리밍 제목을 입력해 주세요'
              value={streamOption.title}
              onChange={(e) => setStreamOption({ ...streamOption, title: e.target.value })}
            />
          </div>
        </div>
        <div className='flex items-center gap-8 p-8 border-2 border-gray-500'>
          <label className='p-2 w-36' htmlFor='category'>
            카테고리 설정
          </label>
          <select
            id='category'
            className='w-5/6 p-3 border-b-2 border-gray-500 bg-base-100'
            value={streamOption.category}
            onChange={(e) => setStreamOption({ ...streamOption, category: e.target.value })}
          >
            <option value=''>선택</option>
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='flex items-center gap-8 p-8 border-2 border-gray-500'>
          <label className='p-2 w-36' htmlFor='donation'>
            후원 설정
          </label>
          <input
            id='donation'
            type='checkbox'
            className='checkbox'
            checked={streamOption.donation}
            onChange={(e) => setStreamOption({ ...streamOption, donation: e.target.checked })}
          />
          <p>라이브 스트리밍 중 후원 기능을 활성화 합니다.</p>
        </div>
        <div className='flex items-center gap-8 p-8 border-2 border-gray-500'>
          <label className='p-2 w-36' htmlFor='chat'>
            실시간 채팅 설정
          </label>
          <input
            id='chat'
            type='checkbox'
            className='checkbox'
            checked={streamOption.liveChat}
            onChange={(e) => setStreamOption({ ...streamOption, liveChat: e.target.checked })}
          />
          <p>라이브 스트리밍 중 실시간 채팅 기능을 활성화 합니다.</p>
        </div>
        <div className='flex items-center gap-8 p-8 border-2 border-gray-500'>
          <label className='p-2 w-36' htmlFor='streamUrl'>
            스트림 URL
          </label>
          <div className='w-full'>
            <input
              id='streamUrl'
              type='text'
              value={streamOption.streamUrl}
              readOnly
              className='w-full p-3 placeholder-gray-500 border-b-2 border-gray-500 bg-base-100'
              placeholder='스트림 URL을 입력하세요'
            />
          </div>
        </div>
        <div className='flex items-center gap-8 p-8 border-2 border-gray-500 '>
          <label className='p-2 w-36' htmlFor='streamKey'>
            스트림 키
          </label>
          <div className='w-full'>
            <input
              id='streamKey'
              type='text'
              value={streamOption.streamKey}
              onChange={(e) => setStreamOption({ ...streamOption, streamKey: e.target.value })}
              className='w-full p-3 placeholder-gray-500 border-b-2 border-gray-500 bg-base-100'
              placeholder='스트림 키를 입력하세요'
            />
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <button className='w-40 btn btn-outline' disabled={isFormInValid}>
            라이브 스트리밍 시작
          </button>
        </div>
      </form>
    </div>
  );
}
