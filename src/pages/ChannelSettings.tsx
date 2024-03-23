import React, { useState } from 'react';
import { useUpdateNickname } from '../utils/channelSetting/useUpdateNickname';
import { useUpdateIntro } from '../utils/channelSetting/useUpdateIntro';
import { useNavigate } from 'react-router-dom';
import { getAuthAxios } from '../utils/signIn/authAxios';
import { useRecoilState } from 'recoil';
import { currentUserInfo } from '../store';

export default function ChannelSettings() {
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo);
  const [name, setName] = useState(userInfo.nickname);
  const [introduction, setIntroduction] = useState(userInfo.channelIntroduction);
  const [imgUrl, setImgUrl] = useState(userInfo.profilePhotoUrl);
  const updateName = useUpdateNickname(name);
  const updateChannelIntro = useUpdateIntro(introduction);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      const formData = new FormData();
      formData.append('file', file);

      return await authAxios
        .put('/api/api/users/profile-photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => setImgUrl(res.data));
    }
  };

  const handleRemoveImg = async () => {
    const res = (await authAxios.put('/api/api/users/reset-profile-photo')).data;
    setImgUrl(res);
  };

  const handleUpdatePage = () => {
    if (name === '') {
      alert('retry');
      return;
    }
    if (userInfo.nickname !== name) {
      updateName();
      setUserInfo({ ...userInfo, nickname: name });
      return;
    }
    if (userInfo.channelIntroduction !== introduction) {
      updateChannelIntro();
      setUserInfo({ ...userInfo, channelIntroduction: introduction });
      return;
    }
    console.log(name);
  };

  return (
    <div>
      <div className='p-2 m-auto sm:w-full md:w-4/5'>
        <div className='flex items-center justify-between my-7'>
          <h1 className='sm:text-xl md:text-3xl'>채널관리</h1>
          <div className='flex items-center gap-x-3'>
            <button onClick={() => navigate(-1)} className='btn btn-neutral sm:btn-sm md:btn-md'>
              취소
            </button>
            <button
              onClick={handleUpdatePage}
              className='text-white btn btn-success sm:btn-sm md:btn-md'
            >
              저장
            </button>
          </div>
        </div>

        <div className='flex flex-col px-5 py-10 border-2 rounded-lg gap-y-10'>
          <div className='flex sm:flex-col sm:gap-y-3 md:flex-row md:gap-x-32'>
            <span className='w-56 font-bold'>프로필 이미지</span>
            <div className='flex items-center w-full sm:justify-center md:justify-start gap-x-4'>
              <div className='avatar'>
                <div className='rounded-full sm:w-16 md:w-20 ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={imgUrl} />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-y-3'>
                <label
                  className='px-3 py-2 text-sm bg-transparent border-2 rounded-xl hover:bg-[rgba(0,0,0,.4)]'
                  htmlFor='fileUpload'
                >
                  <input
                    type='file'
                    onChange={handleChangeImg}
                    accept='image/*'
                    className='hidden '
                    id='fileUpload'
                  />
                  등록
                </label>

                <button
                  onClick={handleRemoveImg}
                  className='w-full px-3 py-2 text-sm bg-transparent border-2 rounded-xl hover:bg-[rgba(0,0,0,.4)]'
                >
                  삭제
                </button>
              </div>
            </div>
          </div>

          <div className='flex sm:flex-col sm:gap-y-3 md:flex-row md:gap-x-32'>
            <span className='w-56 font-bold'>닉네임</span>
            <input
              type='text'
              placeholder='닉네임'
              className='w-full input input-bordered input-success'
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>

          <div className='flex sm:flex-col sm:gap-y-3 md:flex-row md:gap-x-32'>
            <span className='w-56 font-bold'>채널 소개</span>
            <textarea
              className='w-full resize-none textarea textarea-success'
              placeholder='내 채널을 소개하는 글을 적어보세요!'
              value={introduction}
              onChange={(e) => setIntroduction(e.currentTarget.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
