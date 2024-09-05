package com.example.donzoom.dto.account.bank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CreateAccountRequest {
  private final String accountTypeUniqueNo;
}
