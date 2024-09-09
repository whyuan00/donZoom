package com.example.donzoom.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic"); //topic 으로 시작하는 주소는 클라이언트로
    config.setApplicationDestinationPrefixes("/app"); // app 으로 시작하는 주소는 서버로 라우팅
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/websocket")
        .setAllowedOrigins("http://127.0.0.1:5500", "http://localhost:5500")  // 여기에 허용할 도메인 추가
        .withSockJS(); // 클라이언트가 웹소켓 연결에 사용할 엔드포인트
    // withSockJs => 소켓 지원하지 않는곳에서도 사용하게금 설정 (우리 프로젝트는 아마 필요 없음)
  }
}
