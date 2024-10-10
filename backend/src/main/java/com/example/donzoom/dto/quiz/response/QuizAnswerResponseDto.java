package com.example.donzoom.dto.quiz.response;

import com.example.donzoom.entity.Quiz;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuizAnswerResponseDto {
  private final Quiz quiz;
  private final Boolean isCorrect;
}
