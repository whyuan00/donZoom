package com.example.donzoom.service;

import com.example.donzoom.dto.alarm.response.AlarmResponseDto;
import com.example.donzoom.entity.Alarm;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.AlarmRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FCMService {

    private final AlarmRepository alarmRepository;
    private final UserService userService;

    public String sendNotification(User user, String title, String body)
            throws FirebaseMessagingException {
        String token = user.getDeviceToken();
        log.info(token);
        log.info(title);
        log.info(body);
        // FCM 메시지 빌드
        Message message = Message.builder().setToken(token)  // FCM 토큰
                .setNotification(Notification.builder().setTitle(title)  // 알림 제목
                        .setBody(body)    // 알림 내용
                        .build()).build();

        // 메시지 전송
        String result = FirebaseMessaging.getInstance().send(message);
        Alarm alarm = Alarm.builder().user(user).title(title).body(body).build();
        alarmRepository.save(alarm);
        return result;
    }

    public List<AlarmResponseDto> getAllAlarms() {
        User user = userService.findCurrentUser();
        List<Alarm> alarms = alarmRepository.findAllAlarmsByUserId(user.getId());
        return alarms.stream()
                .map(alarm -> AlarmResponseDto.builder()
                        .id(alarm.getId())
                        .title(alarm.getTitle())
                        .body(alarm.getBody())
                        .status(alarm.getStatus())
                        .type(alarm.getType())
                        .build()).toList();
    }

    public Alarm updateAlarmStatus(Long alarmId, String status) {
        Alarm alarm = alarmRepository.findById(alarmId).orElse(null);
        if (alarm != null) {
            alarm.updateStatus(status);
            alarmRepository.save(alarm);
        }
        return alarm;
    }

}