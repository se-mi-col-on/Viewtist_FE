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
import { ImUserTie } from 'react-icons/im';
import { PiFinnTheHumanFill } from 'react-icons/pi';
import { GiGuitar } from 'react-icons/gi';

export default function Submenu() {
  return (
    <ul className='w-full menu bg-base-100 rounded-box'>
      <li>
        <Link to={'/'}>
          <FaHome /> 홈
        </Link>
      </li>
      <li>
        <details open>
          <summary>
            <FaUserCircle /> 내 정보
          </summary>
          <ul>
            <li>
              <div>
                <ImUserTie /> 내 프로필
              </div>
            </li>
            <li>
              <div>
                <GrChannel /> 내 채널
              </div>
            </li>
            <li>
              <div>
                <PiBroadcastBold /> 스트리밍 시작하기
              </div>
            </li>
            <li>
              <div>
                <FaListAlt /> 내 구독 리스트
              </div>
            </li>
            <li>
              <div>
                <TbMoodUnamused /> 뮤즈 구입하기
              </div>
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
              <div>
                <FaMicrophone /> 노래
              </div>
            </li>
            <li>
              <div>
                <GiSmart /> 댄스
              </div>
            </li>
            <li>
              <div>
                <FaMusic /> 작곡
              </div>
            </li>
            <li>
              <div>
                <FaPaintbrush /> 그림
              </div>
            </li>
            <li>
              <div>
                <MdMonochromePhotos /> 사진
              </div>
            </li>
            <li>
              <div>
                <PiFinnTheHumanFill /> 연기
              </div>
            </li>
            <li>
              <div>
                <GiGuitar /> 악기
              </div>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
