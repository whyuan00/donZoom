package com.example.donzoom.entity;

import com.example.donzoom.constant.MissionStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AutoTransfer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="auto_transfer_id")
  private Long id;

  private String withdrawalAccountNo;
  private String depositAccountNo;
  private Long transactionBalance;
  private String transferDate;
  private String userKey;


  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;  // User와의 연관관계 추가

  @Builder
  public AutoTransfer(String withdrawalAccountNo, String depositAccountNo, Long transactionBalance, String transferDate, String userKey
  ,User user){
    this.withdrawalAccountNo = withdrawalAccountNo;
    this.depositAccountNo = depositAccountNo;
    this.transactionBalance = transactionBalance;
    this.transferDate = transferDate;
    this.userKey = userKey;
    this.user = user;
  }


  public void updateTransferDate(String transferDate) {
    this.transferDate = transferDate;
  }

  public void updateTransactionBalance(Long transactionBalance) {
    this.transactionBalance = transactionBalance;
  }
}
