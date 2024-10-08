package com.example.donzoom.dto.savings.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SavingsResponseDto {
  private final int principal;   // 원금
  private final int interest;    // 예상 이자
  private final int totalAmount; // 총 예상 금액
}
