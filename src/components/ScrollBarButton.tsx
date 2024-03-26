import { FaArrowUp } from 'react-icons/fa';

export default function ScrollBarButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={scrollToTop} className='fixed px-4 py-2 btn btn-circle bottom-4 right-4'>
      <FaArrowUp />
    </button>
  );
}
