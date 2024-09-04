package com.example.donzoom.controller;

import com.example.donzoom.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

  private final QuizService quizService;

  @GetMapping
  public ResponseEntity<String> getQuiz() {
    // 내가 푼 퀴즈 가져오기
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/today")
  public ResponseEntity<?> getTodayQuiz() {
    // 오늘의 퀴즈 불러오기
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping("/today")
  public ResponseEntity<?> submitTodayAnswer() {
    // 오늘의 퀴즈 정답 제출하기
    return new ResponseEntity<>(HttpStatus.OK);
  }

  
}
