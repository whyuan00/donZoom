package com.example.donzoom.dto.stock.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockWalletResponseDto {

  private Long stockWalletId;
  private Long stockId;
  private String stockName;
  private Float price;
  private Integer amount;

}
