package com.example.donzoom.controller;

import com.example.donzoom.entity.Pig;
import com.example.donzoom.service.PigService;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/pig")
public class PigController {

  private final PigService pigService;

  @GetMapping
  public ResponseEntity<List<Pig>> getPigs() {
    try {
      List<Pig> pigs = pigService.getPigs(1); //일단 임의의 지갑아이디
      return new ResponseEntity<>(pigs, HttpStatus.OK); // 성공 상태 코드와 데이터 반환
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 잘못된 요청인 경우
    }
  }

}
