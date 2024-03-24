// import { useState, useEffect } from 'react';
// import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
// import { useQueryClient } from '@tanstack/react-query';

// const NOTIFY_URL = '/live/api/notify/connect';

export default function Notify() {
  // const accessToken = localStorage.getItem('accessToken');
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   const EventSource = EventSourcePolyfill || NativeEventSource;
  //   const eventSource = new EventSource(NOTIFY_URL, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       Connection: 'keep-alive',
  //       Accept: 'text/event-stream',
  //     },
  //     heartbeatTimeout: 86400000, //  연결 시간 24시간으로 설정
  //   });
  //   console.log(eventSource);
  //   eventSource.onopen = (event) => {
  //     if (event.status === 200) {
  //       console.log('SSE 연결 성공');
  //     } else {
  //       console.log('SSE 연결 실패');
  //     }
  //   };

  //   eventSource.onmessage = (event) => {
  //     console.log(event.data);
  //     const value = JSON.parse(event.data);
  //     console.log(value);
  //     // console.log(event);
  //     // 받은 데이터 Json타입으로 형변환 가능여부fn
  //     console.log('메세지 이벤트 발생하니?');
  //     // const isJson = (str) => {
  //     //   try {
  //     //     const json = JSON.parse(str);
  //     //     return json && typeof json === 'object';
  //     //   } catch (e) {
  //     //     return false;
  //     //   }
  //     // };
  //     // if (isJson(event.data)) {
  //     //   //알림 리스트 (재요청하는 파트)
  //     //   // setGotMessage(true)
  //     //   //실시간 알림 데이터
  //     //   const obj = JSON.parse(event.data);
  //     //   console.log(obj);
  //     //   // setNewNotice(obj)
  //     // }
  //     // console.log(event.data);
  //   };
  //   // sse 에러
  //   eventSource.onerror = (event) => {
  //     if (eventSource !== undefined) {
  //       eventSource.close();
  //       // setListening(false)
  //     }
  //   };

  //   return () => {
  //     eventSource.close();
  //     console.log('SSE CLOSED');
  //   };
  // });

  return <div>알람</div>;
  // return (
  //   <div className='flex items-center w-2/3 border-2'>
  //     <div className='w-full overflow-x-auto'>
  //       <table className='table'>
  //         <thead>
  //           <tr>
  //             <th></th>
  //             <th>스트리머</th>
  //             <th>내용</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {notify.map((item, index) => (
  //             <NotifyItems {...item} key={`${index}_${item.name}`} />
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}

// const NotifyItems = ({ name, content, src }: { name: string; content: string; src: string }) => {
//   return (
//     <tr>
//       <th></th>
//       <td>
//         <div className='flex items-center gap-3'>
//           <div className='avatar'>
//             <div className='w-12 h-12 mask mask-squircle'>
//               <img src={src} alt='Avatar Tailwind CSS Component' />
//             </div>
//           </div>
//           <div>
//             <div className='font-bold'>{name}</div>
//           </div>
//         </div>
//       </td>
//       <td>{content}</td>
//     </tr>
//   );
// };
