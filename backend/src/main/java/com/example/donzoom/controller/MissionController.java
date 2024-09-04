package com.example.donzoom.controller;

import com.example.donzoom.entity.Mission;
import com.example.donzoom.service.MissionService;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mission")
public class MissionController {

  private final MissionService missionService;

  @GetMapping
  public ResponseEntity<?> getAllMissions() {
    // 내 미션 전체 조회
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<?> addMission(@RequestBody Mission mission) {
    // 미션 생성
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/{missionId}")
  public ResponseEntity<?> getMissionById(@PathVariable int missionId) {
    // 미션 단일 조회
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PatchMapping("/{missionId}")
  public ResponseEntity<?> updateMission(@PathVariable int missionId, @RequestBody Mission mission) {
    // 미션 수정
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/{missionId}")
  public ResponseEntity<?> deleteMissionById(@PathVariable int missionId) {
    // 미션 삭제
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
