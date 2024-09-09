package com.example.donzoom.dto.account.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateAccountRequest {
  private final String accountTypeUniqueNo;
}
