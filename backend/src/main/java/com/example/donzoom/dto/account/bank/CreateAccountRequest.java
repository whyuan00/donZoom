package com.example.donzoom.dto.account.bank;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateAccountRequest {
  private final String accountTypeUniqueNo;
}
