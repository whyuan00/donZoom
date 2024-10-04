// useStockSocket.tsx
import { useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (onMessage: (message: string) => void) => {
  useEffect(() => {
    const socketUrl = 'https://j11a108.p.ssafy.io/api/websocket';
    const socket = new SockJS(socketUrl);
    const client = Stomp.over(socket);

    // const client = Stomp.client(socketUrl); // 자동 재연결 기능을 포함한 클라이언트 생성
    // withSocketJS 없애야 작동함.
    client.reconnectDelay = 5000;  // 자동 재연결 지연 시간 (5초)

    client.connect({}, () => {
      console.log('STOMP 연결 성공');
      client.subscribe('/topic/stock/5', (message) => {
        if (message.body) {
          onMessage(message.body);
        }
        console.log('받은 메시지: ', message.body);
      });
    });

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('STOMP 연결 종료');
        });
      }
    };
  }, [onMessage]);
};

export default useWebSocket;