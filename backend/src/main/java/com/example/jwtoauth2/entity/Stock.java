package com.example.jwtoauth2.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stock {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long stockId;

  private String stockName;
  private Float stockPrice;

  @Builder
  public Stock(String stockName, Float stockPrice) {
    this.stockName = stockName;
    this.stockPrice = stockPrice;
  }
}
