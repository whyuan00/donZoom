package com.example.donzoom.controller;

import com.example.donzoom.dto.stock.response.StockResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StockWebSocketController {

  private final SimpMessagingTemplate messagingTemplate;

  public void sendStockUpdate(String stockData) {
    messagingTemplate.convertAndSend("/topic/stock", stockData);
  }

  // /app/test로 보낸 메세지를 처리
  @MessageMapping("/test")
  @SendTo("/topic/test")
  public String testConnection() {
    log.info("클라이언트에서 성공적으로 소켓 요청이 도착했습니다.");
    return "서버에서 성공적으로 응답을 보냈습니다.";
  }
}
