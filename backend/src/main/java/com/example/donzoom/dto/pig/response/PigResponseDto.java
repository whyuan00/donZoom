package com.example.donzoom.dto.pig.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PigResponseDto {
  private final Long pigId;
  private final String imageUrl;
  private final String pigName;
}
