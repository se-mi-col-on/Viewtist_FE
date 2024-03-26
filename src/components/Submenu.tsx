import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { FaMusic } from 'react-icons/fa';
import { GiSmart } from 'react-icons/gi';
import { FaPaintbrush } from 'react-icons/fa6';
import { MdMonochromePhotos } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { GrChannel } from 'react-icons/gr';
import { PiBroadcastBold } from 'react-icons/pi';
import { FaListAlt } from 'react-icons/fa';
import { PiFinnTheHumanFill } from 'react-icons/pi';
import { FaCirclePlay } from 'react-icons/fa6';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '../store';

export default function Submenu() {
  const userInfo = useRecoilValue(currentUserInfo);

  return (
    <ul className='sm:w-[11rem] md:w-[15rem] min-h-full p-4 menu bg-base-100 text-base-content rounded-r-lg'>
      <li>
        <Link to={'/'}>
          <button className='flex items-center text-white gap-x-2'>
            <FaHome /> 홈
          </button>
        </Link>
      </li>
      <li>
        <details open>
          <summary>
            <FaUserCircle /> 내 정보
          </summary>
          <ul>
            <li>
              <Link to={`/channel/${userInfo?.nickname}`}>
                <button className='flex items-center gap-x-2'>
                  <GrChannel /> 내 채널
                </button>
              </Link>
            </li>
            <li>
              <Link to={'streaming/obs_downLoad'}>
                <button className='flex items-center gap-x-2'>
                  <PiBroadcastBold /> 스트리밍
                </button>
              </Link>
            </li>
            <li>
              <Link to={`/channel/${userInfo?.nickname}/subscriptions`}>
                <button className='flex items-center gap-x-2'>
                  <FaListAlt /> 구독
                </button>
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>
            <MdCategory /> 카테고리
          </summary>
          <ul>
            <li>
              <Link to={'/category/all'}>
                <FaCirclePlay /> 전체
              </Link>
            </li>
            <li>
              <Link to={'category/music'}>
                <FaMusic /> 음악
              </Link>
            </li>
            <li>
              <Link to={'category/dance'}>
                <GiSmart /> 댄스
              </Link>
            </li>
            <li>
              <Link to={'/category/draw'}>
                <FaPaintbrush /> 그림
              </Link>
            </li>
            <li>
              <Link to={'/category/picture'}>
                <MdMonochromePhotos /> 사진
              </Link>
            </li>
            <li>
              <Link to={'/category/act'}>
                <PiFinnTheHumanFill /> 연기
              </Link>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
