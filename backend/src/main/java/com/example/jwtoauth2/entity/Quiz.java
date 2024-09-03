package com.example.jwtoauth2.entity;

import com.example.jwtoauth2.constant.QuizType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long quizId;

  private QuizType quizType;

  private String question;

  private Integer answer;

  private String option1;
  private String option2;
  private String option3;
  private String option4;


  @Builder
  public Quiz(QuizType quizType, String question, Integer answer, String option1, String option2, String option3, String option4){
    this.quizType = quizType;
    this.question = question;
    this.answer = answer;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
  }

}
