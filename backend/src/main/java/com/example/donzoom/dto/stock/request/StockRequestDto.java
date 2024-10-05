package com.example.donzoom.dto.stock.request;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockRequestDto {

  private Long stockId;
  private Float open;
  private Float close;
  private Float high;
  private Float low;
  private LocalDateTime createdAt;

}
