export default function ChannelSettings() {
  return (
    <div>
      <div className='p-2 m-auto sm:w-full md:w-4/5'>
        <div className='flex items-center justify-between my-7'>
          <h1 className='sm:text-xl md:text-3xl'>채널관리</h1>
          <div className='flex items-center gap-x-3'>
            <button className='btn btn-neutral sm:btn-sm md:btn-md'>취소</button>
            <button className='text-white btn btn-success sm:btn-sm md:btn-md'>저장</button>
          </div>
        </div>

        <div className='flex flex-col px-5 py-10 border-2 rounded-lg gap-y-10'>
          <div className='flex sm:flex-col sm:gap-y-3 md:flex-row md:gap-x-32'>
            <span className='w-56 font-bold'>프로필 이미지</span>
            <div className='flex items-center w-full sm:justify-center md:justify-start gap-x-4'>
              <div className='avatar'>
                <div className='rounded-full sm:w-16 md:w-20 ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
                </div>
              </div>
              <label
                className='px-3 py-2 text-sm bg-transparent border-2 rounded-xl hover:bg-[rgba(0,0,0,.4)]'
                htmlFor='fileUpload'
              >
                <input type='file' className='hidden ' id='fileUpload' />
                이미지 수정
              </label>
            </div>
          </div>

          <div className='flex sm:flex-col sm:gap-y-3 md:flex-row md:gap-x-32'>
            <span className='w-56 font-bold'>닉네임</span>
            <input
              type='text'
              placeholder='닉네임'
              className='w-full input input-bordered input-success'
            />
          </div>

          <div className='flex sm:flex-col sm:gap-y-3 md:flex-row md:gap-x-32'>
            <span className='w-56 font-bold'>채널 소개</span>
            <textarea
              className='w-full resize-none textarea textarea-success'
              placeholder='내 채널을 소개하는 글을 적어보세요!'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
