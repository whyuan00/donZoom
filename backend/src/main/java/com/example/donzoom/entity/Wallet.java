package com.example.donzoom.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wallet {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "WALLET_ID")
  private Long id;

  @OneToMany(mappedBy = "wallet")
  private List<MyPig> mypigs = new ArrayList<>();

  private Integer coin;

  private Integer ticket;

  @Builder
  public Wallet(Integer coin, Integer ticket, List<MyPig> mypigs) {
    this.coin = coin;
    this.ticket = ticket;
    if (mypigs != null) {
      this.mypigs = mypigs;
    }
  }

  public void updateCoin(Integer coin) {
    this.coin = coin;
  }

  public void updateTicket(Integer ticket) {
    this.ticket = ticket;
  }
}
