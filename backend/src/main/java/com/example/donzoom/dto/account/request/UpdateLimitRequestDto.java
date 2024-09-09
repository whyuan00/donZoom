package com.example.donzoom.dto.account.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateLimitRequestDto {
  private final String accountNo;
  private final String oneTimeLimit;
  private final String dailyLimit;
}
