package com.example.donzoom.dto.stockhistory.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockHistoryResponseDto {

  private Long stockHistoryId;
  private Float open;
  private Float close;
  private Float high;
  private Float low;
  private LocalDateTime createdAt;

}
