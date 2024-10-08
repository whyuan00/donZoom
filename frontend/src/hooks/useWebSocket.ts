// useStockSocket.tsx
import { useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type OnMessageType = (message: string, stockId?: number) => void;

const useStockWebSocket = (stockIds: number[], onMessage: OnMessageType) => {
  useEffect(() => {
    if (!stockIds || stockIds.length === 0) return;

    const socketUrl = 'https://j11a108.p.ssafy.io/api/websocket';
    // const socketUrl = 'http://localhost:8081/api/websocket';
    const socket = new SockJS(socketUrl);
    const client = Stomp.over(()=>socket);
    // const client = Stomp.client(socketUrl);
    client.reconnectDelay = 5000;

    client.connect({}, () => {
      console.log('STOMP 연결 성공');

      // 주어진 주식 ID에 대해 구독
      stockIds.forEach((stockId: any) => {
        client.subscribe(`/topic/stock/${stockId}`, (message) => {
          if (message.body) {
            onMessage(message.body, stockId);
          }
          console.log('받은 메시지: ', message.body);
        });
      });
    });

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('STOMP 연결 종료');
        });
      }
    };
  }, [stockIds, onMessage]);
};

export default useStockWebSocket;