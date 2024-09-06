package com.example.donzoom.dto.account.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class RecDto {
  private final String bankCode;
  private final String accountNo;
  private final CurrencyDto currency;
}
