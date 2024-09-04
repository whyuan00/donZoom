package com.example.donzoom.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class StockHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long stockHistoryId;

  @ManyToOne(fetch = FetchType.LAZY)
  private Stock stock;

  private Float price;

  @Builder
  public StockHistory(Stock stock, Float price) {
    this.stock = stock;
    this.price = price;
  }

}
