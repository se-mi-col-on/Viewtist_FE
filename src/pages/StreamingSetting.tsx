import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStreamKey } from '../utils/streamingSetting/useStreamKey';
import { getRefreshStreamKey, createStreaming } from '../api';
import { STREAM_CATEGORY_LIST, STREAM_URL } from '../constants/constant';
import { LiveSet } from '../types/interface';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

export default function StreamingSetting() {
  const navigate = useNavigate();
  const { data } = useStreamKey();
  const [streamKey, setStreamKey] = useState(data || '');
  const [isView, setIsView] = useState(false);

  const [streamOption, setStreamOption] = useState<LiveSet>({
    title: '',
    category: '',
  });
  const isFormInValid = Object.values(streamOption).some((value) => value === '');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = await createStreaming(streamOption);
    navigate(`/streaming/live/${id}`);
  };
  const handleRefreshKey = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const newKey = await getRefreshStreamKey();
      setStreamKey(newKey);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyToClipboard = async (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    try {
      e.preventDefault();
      await navigator.clipboard.writeText(text);
      alert('텍스트가 클립보드에 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사 중 오류가 발생했습니다');
      console.error(error);
    }
  };

  const handleKeyView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsView(!isView);
  };
  useEffect(() => {
    setStreamKey(data || '');
  }, [data]);

  return (
    <div className='flex flex-col items-center h-full gap-3 p-10 border-2 lg:w-3/4 sm:w-full'>
      <p className='text-xl'>라이브 스트리밍 설정</p>
      <form className='flex flex-col w-5/6 gap-5 sm:w-full' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex p-8 border-2 border-gray-500 md:items-center md:gap-8 md:flex-row sm:flex-col sm:gap-2'>
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
        <div className='flex p-8 border-2 border-gray-500 md:items-center md:gap-8 md:flex-row sm:flex-col sm:gap-2'>
          <label className='p-2 w-36' htmlFor='category'>
            카테고리
          </label>
          <select
            id='category'
            className='w-full p-3 border-b-2 border-gray-500 bg-base-100'
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
        <div className='flex p-8 border-2 border-gray-500 md:items-center md:gap-8 md:flex-row sm:flex-col sm:gap-2'>
          <label className='p-2 w-36' htmlFor='streamUrl'>
            스트림 URL
          </label>
          <div className='w-full overflow-hidden'>
            <p className='p-3 placeholder-gray-500 border-b-2 border-gray-500 bg-base-100'>
              {STREAM_URL}
            </p>
          </div>
          <button
            onClick={(e) => handleCopyToClipboard(e, STREAM_URL)}
            className='w-16 btn btn-outline btn-xs btn-secondary'
          >
            복사
          </button>
        </div>
        <div className='flex p-8 border-2 border-gray-500 md:items-center md:gap-8 md:flex-row sm:flex-col sm:gap-2'>
          <label className='p-2 w-36' htmlFor='streamKey'>
            스트림 키
          </label>
          <div className='flex items-center w-full gap-5'>
            <input
              value={streamKey}
              type={isView ? 'text' : 'password'}
              className='w-full p-3 placeholder-gray-500 border-b-2 border-gray-500 bg-base-100'
              readOnly
            />
            <button onClick={handleKeyView}>{isView ? <FaEye /> : <FaEyeSlash />}</button>
            <div className='flex flex-col w-20 gap-2 whitespace-nowrap'>
              <button
                onClick={(e) => handleCopyToClipboard(e, streamKey)}
                className='btn btn-outline btn-xs btn-secondary'
              >
                복사
              </button>
              <button onClick={handleRefreshKey} className='btn btn-outline btn-xs btn-primary'>
                재발급
              </button>
            </div>
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
