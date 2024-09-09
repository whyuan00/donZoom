package com.example.donzoom.entity;

import com.example.donzoom.constant.MissionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

  @Builder
  public AutoTransfer(String withdrawalAccountNo, String depositAccountNo, Long transactionBalance, String transferDate, String userKey){
    this.withdrawalAccountNo = withdrawalAccountNo;
    this.depositAccountNo = depositAccountNo;
    this.transactionBalance = transactionBalance;
    this.transferDate = transferDate;
    this.userKey = userKey;
  }
}
