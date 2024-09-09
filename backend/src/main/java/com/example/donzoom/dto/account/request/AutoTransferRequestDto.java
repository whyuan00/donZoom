package com.example.donzoom.dto.account.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class AutoTransferRequestDto {
  private final String depositAccountNo;
  private final Long transactionBalance;
  private final String withdrawalAccountNo;
  private String transferDate;  // 매월 이체될 날짜
}
