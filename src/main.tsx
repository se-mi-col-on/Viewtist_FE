import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router.tsx';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
