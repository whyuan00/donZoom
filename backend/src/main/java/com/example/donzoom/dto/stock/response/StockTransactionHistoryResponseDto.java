package com.example.donzoom.dto.stock.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockTransactionHistoryResponseDto {

  private Long transactionHistoryId;
  private Long stockId;
  private Float price;
  private Integer amount;
  private Float total;
  private LocalDateTime createdAt;

}
