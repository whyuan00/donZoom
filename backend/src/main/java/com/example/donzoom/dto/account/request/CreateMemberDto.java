package com.example.donzoom.dto.account.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CreateMemberDto {
  private final String apiKey;
  private final String userId;
}
