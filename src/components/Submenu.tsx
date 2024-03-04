import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { FaMusic } from 'react-icons/fa';
import { FaMicrophone } from 'react-icons/fa';
import { GiSmart } from 'react-icons/gi';
import { FaPaintbrush } from 'react-icons/fa6';
import { MdMonochromePhotos } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { GrChannel } from 'react-icons/gr';
import { PiBroadcastBold } from 'react-icons/pi';
import { FaListAlt } from 'react-icons/fa';
import { TbMoodUnamused } from 'react-icons/tb';
import { PiFinnTheHumanFill } from 'react-icons/pi';
import { GiGuitar } from 'react-icons/gi';
import { FaCirclePlay } from 'react-icons/fa6';

export default function Submenu() {
  return (
    <ul className='w-full menu bg-base-100 rounded-box'>
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
              <Link to={'/channel/muse'}>
                <button className='flex items-center text-white gap-x-2'>
                  <GrChannel /> 내 채널
                </button>
              </Link>
            </li>
            <li>
              <Link to={'streaming/setting'}>
                <button className='flex items-center text-white gap-x-2'>
                  <PiBroadcastBold /> 스트리밍 시작하기
                </button>
              </Link>
            </li>
            <li>
              <Link to={'/channel/subscriptions'}>
                <button className='flex items-center text-white gap-x-2'>
                  <FaListAlt /> 내 구독리스트
                </button>
              </Link>
            </li>
            <li>
              <Link to={'/channel/muse'}>
                <button className='flex items-center text-white gap-x-2'>
                  <TbMoodUnamused /> 뮤즈 구입하기
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
              <Link to={'category/sing'}>
                <FaMicrophone /> 노래
              </Link>
            </li>
            <li>
              <Link to={'category/dance'}>
                <GiSmart /> 댄스
              </Link>
            </li>
            <li>
              <Link to={'/category/composition'}>
                <FaMusic /> 작곡
              </Link>
            </li>
            <li>
              <Link to={'/category/painting'}>
                <FaPaintbrush /> 그림
              </Link>
            </li>
            <li>
              <Link to={'/category/picture'}>
                <MdMonochromePhotos /> 사진
              </Link>
            </li>
            <li>
              <Link to={'/category/performance'}>
                <PiFinnTheHumanFill /> 연기
              </Link>
            </li>
            <li>
              <Link to={'/category/instrument'}>
                <GiGuitar /> 악기
              </Link>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
