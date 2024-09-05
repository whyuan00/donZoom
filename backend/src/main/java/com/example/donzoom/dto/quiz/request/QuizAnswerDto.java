package com.example.donzoom.dto.quiz.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuizAnswerDto {
  private final Integer answer;
}
