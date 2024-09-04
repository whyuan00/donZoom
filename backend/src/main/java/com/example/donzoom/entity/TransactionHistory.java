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
public class TransactionHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long transactionHistoryId;

  @ManyToOne(fetch = FetchType.LAZY)
  private Wallet wallet;

  @ManyToOne(fetch = FetchType.LAZY)
  private Stock stock;

  private Float price;
  private Integer amount;

  @Builder
  public TransactionHistory(Wallet wallet, Stock stock, Float price, Integer amount) {
    this.wallet = wallet;
    this.stock = stock;
    this.price = price;
    this.amount = amount;
  }
}
