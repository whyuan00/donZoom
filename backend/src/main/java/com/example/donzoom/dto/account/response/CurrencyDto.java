package com.example.donzoom.dto.account.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CurrencyDto {
  private final String currency;
  private final String currencyName;
}
