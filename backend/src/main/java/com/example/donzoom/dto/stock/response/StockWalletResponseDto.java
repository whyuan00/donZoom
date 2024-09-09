package com.example.donzoom.dto.stock.response;

import com.example.donzoom.entity.StockWallet;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StockWalletResponseDto {

  private Long stockWalletId;     // 보유 주식 ID
  private Long stockId;           // 주식 ID
  private String stockName;       // 주식 이름
  private Float totalInvestedPrice; // 총 매입 금액
  private Integer amount;         // 보유한 주식 수량
  private Float averagePrice;     // 평단가 (이미 StockWallet에서 계산됨)

  @Builder
  public StockWalletResponseDto(StockWallet stockWallet) {
    this.stockWalletId = stockWallet.getId();
    this.stockId = stockWallet.getStock().getId();
    this.stockName = stockWallet.getStock().getStockName();
    this.totalInvestedPrice = stockWallet.getTotalInvestedPrice(); // 총 매입 금액
    this.amount = stockWallet.getAmount();
    this.averagePrice = stockWallet.getAveragePrice(); // 평단가 (별도 필드에서 가져옴)
  }
}
