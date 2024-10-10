package com.example.donzoom.controller;

import com.example.donzoom.constant.MissionStatus;
import com.example.donzoom.dto.mission.request.MissionCreateDto;
import com.example.donzoom.dto.mission.request.MissionUpdateDto;
import com.example.donzoom.dto.mission.response.MissionResponseDto;
import com.example.donzoom.entity.Mission;
import com.example.donzoom.service.MissionService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mission")
public class MissionController {

  private final MissionService missionService;

  @GetMapping("/{userId}/{status}")
  public ResponseEntity<?> getAllMissions(@PathVariable Long userId,
      @PathVariable MissionStatus status) {
    // 내 미션 전체 조회
    List<MissionResponseDto> userMissions = missionService.getUserMissions(userId, status);
    return new ResponseEntity<>(Map.of("missions", userMissions), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<?> createMission(@RequestBody MissionCreateDto missionCreateDto) {
    // 미션 생성
    Mission mission = missionService.createMission(missionCreateDto);
    return new ResponseEntity<>(mission, HttpStatus.OK);
  }

  @GetMapping("/{missionId}")
  public ResponseEntity<?> getMission(@PathVariable long missionId) {
    // 미션 단일 조회
    Mission mission = missionService.getMissionById(missionId);
    return new ResponseEntity<>(mission, HttpStatus.OK);
  }

  @PatchMapping("/{missionId}")
  public ResponseEntity<?> updateMission(@PathVariable Long missionId,
      @RequestBody MissionUpdateDto missionUpdateDto) {
    // 미션 수정
    Mission mission = missionService.updateMission(missionId, missionUpdateDto);
    return new ResponseEntity<>(mission, HttpStatus.OK);
  }

  @DeleteMapping("/{missionId}")
  public ResponseEntity<?> deleteMission(@PathVariable Long missionId) {
    // 미션 삭제
    missionService.deleteMission(missionId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
