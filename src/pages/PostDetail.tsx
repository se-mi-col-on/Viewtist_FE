import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeletePost } from '../utils/community/deletePost';
import { usePostDetailQuery } from '../utils/community/getPosts';
import { useState, useEffect } from 'react';
import Editor from '../components/Editor';

export default function PostDetail() {
  const { id } = useParams();
  const { data, isLoading } = usePostDetailQuery(+id!);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
  }, [data]);

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
        <Link to={'/channel/community'}>
          <button className='btn btn-outline btn-sm'>목록</button>
        </Link>
        <Link to={`/channel/community/update/${id}`}>
          <button className='btn btn-outline btn-success btn-sm'>수정</button>
        </Link>
        <button onClick={handleDelete} className='btn btn-error btn-outline btn-sm'>
          삭제
        </button>
      </div>

      <div className='p-3 rounded-lg'>
        <div className='mb-5 text-4xl'>{data?.title}</div>
        <div className='flex items-center gap-x-5'>
          <div className='avatar'>
            <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <div className='flex items-center gap-x-3'>
            <span>name</span>
            <span>time</span>
          </div>
        </div>
        <div className='divider'></div>

        <Editor readOnly={true} setValue={setContent} value={content} />
      </div>
    </div>
  );
}
