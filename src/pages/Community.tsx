import { BsEmojiTear } from 'react-icons/bs';
import { Link, Outlet, useMatch, useNavigate, useOutletContext } from 'react-router-dom';
import { IPostListItem, IProfile } from '../types/interface';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { TiPinOutline } from 'react-icons/ti';
import { GoTrash } from 'react-icons/go';
import { useDeletePost } from '../utils/community/deletePost';
import { usePostsQuery } from '../utils/community/getPosts';

export default function Community() {
  const communityMatch = useMatch('/channel/community');
  const { data, isLoading } = usePostsQuery();
  const contextData: IProfile = useOutletContext();
  const posts = data?.filter((post) => post.nickname === contextData.nickname);

  if (isLoading) return <h1>loading....</h1>;
  return (
    <div className='flex items-center justify-center'>
      {communityMatch && posts?.length === 0 && (
        <div className='flex flex-col items-center justify-center p-3 gap-y-3'>
          <BsEmojiTear className='sm:text-5xl md:text-7xl' />
          <span className='font-bold'>작성 된 글이 없습니다.</span>
          <Link to={'write'} className='w-1/2 btn btn-success sm:btn-sm md:btn-md'>
            <button>글 쓰기</button>
          </Link>
        </div>
      )}
      {communityMatch && posts?.length !== 0 && (
        <div className='min-h-screen sm:w-full md:w-4/5'>
          <Link to={'write'}>
            <button className='mb-3 btn btn-outline btn-success'>글 쓰기</button>
          </Link>
          <ul className='flex flex-col gap-y-5'>
            {posts?.map((item) => (
              <PostListItem key={item.id} {...item} src={contextData.profilePhotoUrl} />
            ))}
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
}

const PostListItem = ({ src, ...props }: IPostListItem) => {
  const createdTime = new Date(props.createdAt).toLocaleDateString().slice(2);
  const navigate = useNavigate();
  const deletePost = useDeletePost(props.id);

  const removePost = () => {
    if (!confirm('글을 삭제하시겠습니까?')) return;
    deletePost();
  };
  return (
    <li
      className='flex justify-between w-full p-3 border-2 rounded-lg cursor-pointer'
      onClick={() => navigate(`detail/${props.id}`)}
    >
      <div className='relative flex p-1 gap-x-12'>
        <div className='avatar'>
          <div className='absolute rounded-full sm:w-6 md:w-8 ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={src} />
          </div>
        </div>

        <div className='flex flex-col justify-start w-full sm:text-sm md:text-base'>
          <div className='flex items-center gap-x-3'>
            <span>{props.nickname}</span>
            <span className='text-xs shrink-0'>{createdTime}</span>
          </div>
          <span className='font-bold'>{props.title}</span>
        </div>
      </div>

      <details className=' dropdown dropdown-end' onClick={(e) => e.stopPropagation()}>
        <summary className='m-1 mb-auto btn btn-ghost'>
          <HiOutlineDotsVertical />
        </summary>
        <ul className='z-50 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-28'>
          <li onClick={() => navigate(`update/${props.id}`)}>
            <button>
              <TiPinOutline />
              수정
            </button>
          </li>
          <li className='text-red-500' onClick={removePost}>
            <button>
              <GoTrash />
              삭제
            </button>
          </li>
        </ul>
      </details>
    </li>
  );
};
