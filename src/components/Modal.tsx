import { useState } from 'react';
import { STREAM_CATEGORY_LIST } from '../constants/constant';
import { useUpdateDetail } from '../utils/streaming/useUpdateDetail';

export default function Modal({ streamId }: { streamId: string | undefined }) {
  const [newDetail, setNewDetail] = useState({
    updateTitle: '',
    updateCategory: '',
  });
  const isFormInValid = Object.values(newDetail).some((value) => value === '');
  const updateStreamDetail = useUpdateDetail(streamId, newDetail);

  const handleUpdateDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      updateStreamDetail();
      alert('변경사항이 적용되었습니다!');
    } catch (error) {
      alert('다시 한번 시도해 주세요!');
      console.log(error);
    }
  };

  return (
    <dialog id='my_modal_4' className='modal'>
      <div className='flex flex-col max-w-5xl gap-4 lg:w-1/2 md:w-2/3 sm:w-11/12 modal-box'>
        <h3 className='text-lg font-bold'>스트리밍 설정</h3>
        <div className='flex items-center gap-4'>
          <label className='w-16'>제목</label>
          <input
            type='text'
            placeholder='변경할 제목을 입력하세요.'
            className='w-full max-w-xs placeholder-gray-500 input input-bordered'
            onChange={(e) => setNewDetail({ ...newDetail, updateTitle: e.target.value })}
          />
        </div>
        <div className='flex items-center gap-4'>
          <label className='w-16'>카테고리</label>
          <select
            id='category'
            className='w-full max-w-xs select select-bordered'
            value={newDetail.updateCategory}
            onChange={(e) => setNewDetail({ ...newDetail, updateCategory: e.target.value })}
          >
            <option value=''>선택</option>
            {STREAM_CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='modal-action'>
          <form method='dialog' className='flex gap-2'>
            <button className='btn' disabled={isFormInValid} onClick={handleUpdateDetail}>
              적용하기
            </button>
            <button className='btn'>닫기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
