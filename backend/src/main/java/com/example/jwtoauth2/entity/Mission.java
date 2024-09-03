package com.example.jwtoauth2.entity;

import com.example.jwtoauth2.constant.MissionStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mission {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long missionId;

  @ManyToOne
  private User user;

  private String title;
  private String contents;
  private Long reward;
  private MissionStatus status;

  @Builder
  public Mission(User user, String title, String contents, Long reward, MissionStatus status) {
    this.user = user;
    this.title = title;
    this.contents = contents;
    this.reward = reward;
    this.status = status;
  }


}
