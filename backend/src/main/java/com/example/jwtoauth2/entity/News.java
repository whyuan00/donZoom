package com.example.jwtoauth2.entity;

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
public class News {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long newsId;

  @ManyToOne
  private Stock stock;

  private String title;
  private String contents;

  @Builder
  public News(Stock stock, String title, String contents) {
    this.stock = stock;
    this.title = title;
    this.contents = contents;
  }
}
