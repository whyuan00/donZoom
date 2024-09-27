package com.example.donzoom.temp;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fcm")
public class FCMController {

  @PostMapping("/send")
  public ResponseEntity<String> sendNotification(
      @RequestParam String token,
      @RequestParam String title,
      @RequestParam String body) {

    try {
      // FCM 메시지 빌드
      Message message = Message.builder()
          .setToken(token)  // FCM 토큰
          .setNotification(Notification.builder()
              .setTitle(title)  // 알림 제목
              .setBody(body)    // 알림 내용
              .build())
          .build();

      // 메시지 전송
      String response = FirebaseMessaging.getInstance().send(message);
      return ResponseEntity.ok("알림 전송 성공: " + response);
    } catch (FirebaseMessagingException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("알림 전송 실패");
    }
  }
}