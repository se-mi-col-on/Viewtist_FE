export default function Home() {
  return (
    <div className='flex flex-col items-end h-full '>
      <div className='flex flex-col w-5/6 h-full gap-2 p-3 border-2'>
        <p>현재 스트리밍 중인 채널</p>
        <div className='flex flex-wrap justify-center h-full gap-4 p-3'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

const Card = () => {
  return (
    <div className='shadow-xl card w-80 bg-base-100'>
      <figure>
        <img
          className='object-cover h-48 w-96'
          src='https://via.placeholder.com/300x200.jpg'
          alt='스트리밍 화면'
        />
      </figure>
      <div className='flex items-start gap-4 p-2'>
        <div className='avatar'>
          <div className='w-12 rounded-full'>
            <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
          </div>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <p>춤추는나비</p>
          <p>뉴진스 신곡 챌린지</p>
        </div>
        <div className='flex flex-col gap-1 ml-auto mr-3'>
          <button className='btn btn-xs'>댄스</button>
          <button className='btn btn-xs'>569명 시청</button>
        </div>
      </div>
    </div>
  );
};
