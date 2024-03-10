import { Link } from 'react-router-dom';
import { Bs1CircleFill } from 'react-icons/bs';
import { Bs2CircleFill } from 'react-icons/bs';
import { Bs3CircleFill } from 'react-icons/bs';
import { FaFileDownload } from 'react-icons/fa';
import obsGuide from '../assets/obs_guide.png';
import streamStart from '../assets/stream_start.png';

export default function StreamingDownLoad() {
  return (
    <div className='flex flex-col items-center h-full gap-3 p-10'>
      <p className='text-xl'>라이브 스트리밍 시작하기</p>
      <div className='w-2/3 text-xl'>
        <div className='flex flex-col justify-center gap-10'>
          <div className='flex flex-col justify-center gap-3'>
            <div className='flex items-center gap-2'>
              <Bs1CircleFill /> 스트리밍 소프트웨어를 설치하세요.
            </div>
            <a href='https://obsproject.com/ko' target='_blank' rel='noopener noreferrer'>
              <button className='w-72 btn btn-outline'>
                <FaFileDownload />
                Open BroadCaster Software
              </button>
            </a>
          </div>
          <div className='flex flex-col justify-center gap-3'>
            <div className='flex items-center gap-2'>
              <Bs2CircleFill /> 서버 URL과 스트림 키를 소프트웨어에 붙여 넣어주세요.
            </div>
            <img src={obsGuide} alt='설치 가이드' />
            <p className='text-lg'>
              서버 URL과 스트림 키는 다음 스트리밍 설정 페이지에서 확인이 가능합니다.
            </p>
          </div>
          <div className='flex flex-col justify-center gap-3'>
            <div className='flex items-center gap-2'>
              <Bs3CircleFill /> 스트리밍 소프트웨어에서 방송 시작 버튼을 누르면 라이브 스트리밍이
              시작됩니다.
            </div>
            <img className='w-1/3' src={streamStart} alt='방송 설정' />
            <p className='text-lg'>방송 시작과 종료를 소프트웨어에서 진행해 주세요.</p>
          </div>
        </div>
      </div>
      <Link to={'/streaming/setting'}>
        <button className='btn btn-outline'>라이브 스트리밍 설정</button>
      </Link>
    </div>
  );
}
