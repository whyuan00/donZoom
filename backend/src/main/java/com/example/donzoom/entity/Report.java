package com.example.donzoom.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "report_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "stock_id")
  private Stock stock;

  private String title;

  @Column(columnDefinition = "TEXT")
  private String contents;

  private LocalDateTime createdAt;

  private String source;

  @Builder
  public Report(Stock stock, String title, String contents, LocalDateTime createdAt,String source) {
    this.stock = stock;
    this.title = title;
    this.contents = contents;
    this.createdAt = createdAt;
    this.source = source;
  }
}
