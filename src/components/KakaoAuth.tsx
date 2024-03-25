import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function KakaoAuth() {
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  useEffect(() => {
    alert('미구현');
  }, []);

  return <Navigate to={'/sign-in'} />;
}
