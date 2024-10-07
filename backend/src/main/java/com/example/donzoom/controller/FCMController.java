package com.example.donzoom.controller;

import com.example.donzoom.service.FCMService;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/fcm")
public class FCMController {

  private final FCMService fcmService;

  // FCMService 의존성 주입
  public FCMController(FCMService fcmService) {
    this.fcmService = fcmService;
  }

  @PostMapping("/send")
  public ResponseEntity<String> sendNotification(@RequestParam String token,
      @RequestParam String title, @RequestParam String body) {

    try {
      // FCM 서비스 호출
      String response = fcmService.sendNotification(token, title, body);
      return ResponseEntity.ok("알림 전송 성공: " + response);
    } catch (FirebaseMessagingException e) {
      log.error(e.getMessage());
      return ResponseEntity.status(500).body("알림 전송 실패");
    }
  }
}