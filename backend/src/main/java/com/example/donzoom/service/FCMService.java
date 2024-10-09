package com.example.donzoom.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FCMService {

  public String sendNotification(String token, String title, String body)
      throws FirebaseMessagingException {
    log.info(token);
    log.info(title);
    log.info(body);
    // FCM 메시지 빌드
    Message message = Message.builder().setToken(token)  // FCM 토큰
        .setNotification(Notification.builder().setTitle(title)  // 알림 제목
            .setBody(body)    // 알림 내용
            .build()).build();

    // 메시지 전송
    return FirebaseMessaging.getInstance().send(message);
  }
}