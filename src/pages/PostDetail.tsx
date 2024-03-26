import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDeletePost } from '../utils/community/deletePost';
import { usePostDetailQuery } from '../utils/community/getPosts';
import { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import { IProfile } from '../types/interface';
import { useMyPage } from '../utils/channelSetting/useMyPage';

export default function PostDetail() {
  const { id } = useParams();
  const { data: postInfo, isLoading } = usePostDetailQuery(+id!);
  const [content, setContent] = useState('');
  const contextData: IProfile = useOutletContext();
  const { data: myInfo } = useMyPage();
  const createdTime = new Date(postInfo?.createdAt as string).toLocaleTimeString();

  useEffect(() => {
    if (postInfo) {
      setContent(postInfo.content);
    }
  }, [postInfo]);

  const navigate = useNavigate();

  const deletePost = useDeletePost(+id!);

  const handleDelete = () => {
    if (!confirm('글을 삭제하시겠습니까?')) return;
    deletePost();
    navigate(-1);
  };

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className='flex flex-col w-full gap-y-5'>
      <div className='flex items-center gap-x-5'>
        <Link to={`/channel/${contextData.nickname}/community`}>
          <button className='btn btn-outline btn-sm'>목록</button>
        </Link>
        {contextData.nickname === myInfo?.nickname && (
          <>
            <Link to={`/channel/${contextData.nickname}/community/update/${id}`}>
              <button className='btn btn-outline btn-success btn-sm'>수정</button>
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline btn-sm'>
              삭제
            </button>
          </>
        )}
      </div>

      <div className='p-3 rounded-lg'>
        <div className='mb-5 text-4xl'>{postInfo?.title}</div>
        <div className='flex items-center gap-x-5'>
          <div className='avatar'>
            <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src={myInfo?.profilePhotoUrl} />
            </div>
          </div>
          <div className='flex items-center gap-x-3'>
            <span>{postInfo?.nickname}</span>
            <span>{createdTime}</span>
          </div>
        </div>
        <div className='divider'></div>

        <Editor readOnly={true} setValue={setContent} value={content} />
      </div>
    </div>
  );
}
