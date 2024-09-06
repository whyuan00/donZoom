package com.example.donzoom.dto.account.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
public class RecResponseDto {
  private final String bankCode;
  private final String accountNo;
  private final List<CurrencyDto> currencies;
}
