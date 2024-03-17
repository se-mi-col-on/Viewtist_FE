import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STREAM_CATEGORY_LIST, STREAM_URL } from '../constants/constant';
import { LiveSet } from '../types/interface';

export default function StreamingSetting() {
  const navigate = useNavigate();

  const [streamOption, setStreamOption] = useState<LiveSet>({
    title: '',
    category: '',
    streamUrl: STREAM_URL,
    streamKey: '',
  });

  const isFormInValid = Object.values(streamOption).some((value) => value === '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(streamOption);
    navigate('/streaming/live');
  };

  return (
    <div className='flex flex-col items-center w-2/3 h-full gap-3 p-10 border-2'>
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
            {STREAM_CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
