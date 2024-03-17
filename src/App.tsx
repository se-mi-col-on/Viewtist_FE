import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ScrollBarButton from './components/ScrollBarButton';
import Router from './router';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <ScrollBarButton />
    </BrowserRouter>
  );
}
