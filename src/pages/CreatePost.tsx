import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../utils/community/createPost';
import { IoArrowBack } from 'react-icons/io5';
import Editor from '../components/Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const create = useCreatePost({ title, content });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content === '') {
      return alert('게시글을 작성해주세요.');
    }

    create();
    navigate(-1);
  };

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
        required
      />

      <Editor value={content} setValue={setContent} readOnly={false} />

      <div className='flex justify-end sm:w-full md:w-4/5'>
        <button className='btn btn-outline btn-accent px-7'>등록</button>
      </div>
    </form>
  );
}
