package com.example.donzoom.controller;

import com.example.donzoom.dto.stock.response.StockResponseDto;
import com.example.donzoom.dto.stock.response.StockSimpleResponseDto;
import com.example.donzoom.dto.stock.response.StockTransactionHistorySimpleResponseDto;
import com.example.donzoom.dto.stock.response.StockWalletSimpleResponseDto;
import com.example.donzoom.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stock") // TODO: Base URL 생기면 교체 예정
public class StockController {

  private final StockService stockService;

  @GetMapping
  public ResponseEntity<StockSimpleResponseDto> getAllStocks() {
    StockSimpleResponseDto allStocks = stockService.getAllStocks();
    return ResponseEntity.ok().body(allStocks);
  }

  @GetMapping("/{stockId}")
  public ResponseEntity<StockResponseDto> getStockById(@PathVariable(name = "stockId") Long stockId) {
    StockResponseDto stock = stockService.getStockById(stockId);
    return ResponseEntity.ok().body(stock);
  }

  @GetMapping("/my")
  public ResponseEntity<StockWalletSimpleResponseDto> getMyStocks() {
    StockWalletSimpleResponseDto allMyStock = stockService.getAllMyStock();
    return ResponseEntity.ok().body(allMyStock);
  }

  @GetMapping("/myhistory")
  public ResponseEntity<StockTransactionHistorySimpleResponseDto> getMyTransactionHistory() {
    StockTransactionHistorySimpleResponseDto allMyHistories = stockService.getAllTransaction();
    return ResponseEntity.ok().body(allMyHistories);
  }

  @GetMapping("/myhistory/{stockId}")
  public ResponseEntity<StockTransactionHistorySimpleResponseDto> getMyTransactionHistoryByStockId(
      @PathVariable(name = "stockId") Long stockId) {
    StockTransactionHistorySimpleResponseDto historiesByStockId = stockService.getTransaction(stockId);
    return ResponseEntity.ok().body(historiesByStockId);
  }

  @PostMapping("/{stockId}/buy")
  public ResponseEntity<?> buyStocks(@PathVariable(name = "stockId") Long stockId,
      @RequestParam(name = "amount") Integer amount) {
    stockService.buyStocks(stockId, amount);
  }

}
