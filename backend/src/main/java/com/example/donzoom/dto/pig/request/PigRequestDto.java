package com.example.donzoom.dto.pig.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PigRequestDto {
  private Integer amount; // 요청할 Pig의 개수
}