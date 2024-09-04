package com.example.donzoom.service;

import com.example.donzoom.entity.Mission;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.MissionRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MissionService {
  private final MissionRepository missionRepository;
  private final UserRepository userRepository;

  public List<Mission> getUserMissions() {
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();

    // 사용자 정보 (예: PK) 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // 유저의 미션들 가져오기
    return missionRepository.findAllMissionByUserId(user.getId());
  }



}
