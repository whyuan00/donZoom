package com.example.donzoom.dto.account.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateLimitRequestDto {
  private final Long childId;
  private final Long limit;
}
