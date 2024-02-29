import notify from '../../public/data/notify.json';

export default function Notify() {
  // const paginatedList=// pagination or infinite scroll
  return (
    <div className='w-4/5 mx-auto border-2 rounded-lg'>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>스트리머</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {notify.map((item, index) => (
              <NotifyItems {...item} key={`${index}_${item.name}`} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const NotifyItems = ({ name, content, src }: { name: string; content: string; src: string }) => {
  return (
    <tr>
      <th></th>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='w-12 h-12 mask mask-squircle'>
              <img src={src} alt='Avatar Tailwind CSS Component' />
            </div>
          </div>
          <div>
            <div className='font-bold'>{name}</div>
          </div>
        </div>
      </td>
      <td>{content}</td>
    </tr>
  );
};
