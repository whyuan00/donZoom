package com.example.donzoom.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wallet {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "WALLET_ID")
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private User user;

  @OneToMany(mappedBy = "wallet")
  private List<MyPig> mypigs = new ArrayList<>();

  private Integer coin;

  private Integer ticket;

  @Builder
  public Wallet(User user) {
    this.coin = 0;
    this.ticket = 0;
    this.mypigs = new ArrayList<>();
    this.user = user;
  }

  public void updateCoin(Integer coin) {
    this.coin = coin;
  }

  public void updateTicket(Integer ticket) {
    this.ticket = ticket;
  }

  public void updateUser(User user) {
    this.user = user;
  }

  // 코인을 차감하는 메서드
  public void withdraw(Integer amount) {
    if (this.coin < amount) {
      throw new IllegalArgumentException("잔액이 부족합니다.");
    }
    this.coin -= amount;
  }
}
