package com.example.donzoom.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserQuiz {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userQuizId;

  @ManyToOne
  private User user;

  @ManyToOne
  private Quiz quiz;

  private Integer selectedAnswer;

  @Builder
  public UserQuiz(User user, Quiz quiz, Integer selectedAnswer) {
    this.user = user;
    this.quiz = quiz;
    this.selectedAnswer = selectedAnswer;
  }

}
