package com.example.donzoom.service;

import com.example.donzoom.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {
  private final QuizRepository quizRepository;
}
