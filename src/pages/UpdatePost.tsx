import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { usePutPost } from '../utils/community/updatePost';
import { usePostDetailQuery } from '../utils/community/getPosts';
import { IoArrowBack } from 'react-icons/io5';

export default function UpdatePost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const update = usePutPost(+id!, { title, content });
  const { data, isLoading } = usePostDetailQuery(+id!);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content === '') {
      return alert('게시글을 작성해주세요.');
    }

    update();
    navigate(-1);
  };

  if (isLoading) return <h1>loading...</h1>;
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-full gap-y-5'>
      <div className='m-auto sm:w-full md:w-4/5'>
        <button type='button' onClick={() => navigate(-1)}>
          <IoArrowBack className='text-3xl' />
        </button>
      </div>
      <input
        type='text'
        placeholder='제목을 입력해주세요.'
        className=' input input-bordered input-accent sm:w-full md:w-4/5'
        id='title'
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <Editor value={content} setValue={setContent} readOnly={false} />

      <div className='flex justify-end sm:w-full md:w-4/5'>
        <button className='btn btn-outline btn-accent px-7'>등록</button>
      </div>
    </form>
  );
}
