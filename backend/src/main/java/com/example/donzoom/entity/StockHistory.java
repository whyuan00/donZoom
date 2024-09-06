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
public class StockHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "stock_history_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "stock_id")
  private Stock stock;

  private Float price;

  private LocalDateTime createdAt;  // TODO: Base Entity 생기면 교체 예정
  private LocalDateTime modifiedAt; // TODO: Base Entity 생기면 교체 예정

  @Builder
  public StockHistory(Stock stock, Float price) {
    this.stock = stock;
    this.price = price;
    this.createdAt = LocalDateTime.now();   // TODO: Base Entity 생기면 교체 예정
    this.modifiedAt = LocalDateTime.now();  // TODO: Base Entity 생기면 교체 예정
  }

}
