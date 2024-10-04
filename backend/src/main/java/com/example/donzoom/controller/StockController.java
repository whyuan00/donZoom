package com.example.donzoom.controller;

import com.example.donzoom.dto.news.response.NewsSimpleResponseDto;
import com.example.donzoom.dto.stock.request.StockRequestDto;
import com.example.donzoom.dto.stock.response.StockResponseDto;
import com.example.donzoom.dto.stock.response.StockSimpleResponseDto;
import com.example.donzoom.dto.stock.response.StockTransactionHistoryResponseDto;
import com.example.donzoom.dto.stock.response.StockTransactionHistorySimpleResponseDto;
import com.example.donzoom.dto.stock.response.StockWalletSimpleResponseDto;
import com.example.donzoom.entity.StockHistory;
import com.example.donzoom.repository.StockHistoryRepository;
import com.example.donzoom.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stock")
public class StockController {

  private final StockService stockService;
  private final SimpMessagingTemplate messagingTemplate;
  private final StockHistoryRepository stockHistoryRepository;

  // 모든 주식 조회(이름, 현재가)
  @GetMapping
  public ResponseEntity<StockSimpleResponseDto> getAllStocks() {
    StockSimpleResponseDto allStocks = stockService.getAllStocks();
    return ResponseEntity.ok().body(allStocks);
  }

  // 주식 상세 조회
  @GetMapping("/{stockId}")
  public ResponseEntity<StockResponseDto> getStockById(
      @PathVariable(name = "stockId") Long stockId) {
    StockResponseDto stock = stockService.getStockById(stockId);

    return ResponseEntity.ok().body(stock);
  }

  // 주식 정보 받아오기 및 현재가 갱신
  @PostMapping("/{stockId}")
  public ResponseEntity<?> addStockHistory(@PathVariable(name = "stockId") Long stockId,
      @RequestBody StockRequestDto stockRequestDto) {
    Long stockHistoryId = stockService.createStockHistory(stockId, stockRequestDto);

    StockHistory stockHistory = stockHistoryRepository.findById(stockHistoryId).orElseThrow();

    // 여기서 WebSocket 전송
    messagingTemplate.convertAndSend("/topic/stock/" + stockId, stockHistory);

    return ResponseEntity.ok().body(stockHistoryId);
  }

  // 보유주식 가져오기
  @GetMapping("/my/{userId}")
  public ResponseEntity<StockWalletSimpleResponseDto> getMyStocks(
      @PathVariable(name = "userId", required = false) Long userId) {
    StockWalletSimpleResponseDto allMyStock = stockService.getAllStocks(userId);
    return ResponseEntity.ok().body(allMyStock);
  }

  // 주식종목별 보유주식 가져오기
  @GetMapping("/my/{userId}/{stockId}")
  public ResponseEntity<StockWalletSimpleResponseDto> getStock(
      @PathVariable(name = "userId") Long userId, @PathVariable(name = "stockId") Long stockId
  ) {
    StockWalletSimpleResponseDto stock = stockService.getStock(userId, stockId);
    return ResponseEntity.ok().body(stock);
  }

  // 내 거래내역 가져오기
  @GetMapping("/myhistory/{userId}")
  public ResponseEntity<StockTransactionHistorySimpleResponseDto> getMyTransactionHistory(
      @PathVariable(name = "userId") Long userId) {
    StockTransactionHistorySimpleResponseDto allMyHistories = stockService.getAllTransaction(userId);
    return ResponseEntity.ok().body(allMyHistories);
  }

  // 종목별 거래내역 가져오기
  @GetMapping("/myhistory/{stockId}/{userId}")
  public ResponseEntity<StockTransactionHistorySimpleResponseDto> getMyTransactionHistoryByStockId(
      @PathVariable(name = "stockId") Long stockId,
      @PathVariable(name = "userId") Long userId) {
    StockTransactionHistorySimpleResponseDto historiesByStockId = stockService.getTransaction(stockId, userId);
    return ResponseEntity.ok().body(historiesByStockId);
  }

  // 주식 매수
  @PostMapping("/{stockId}/buy")
  public ResponseEntity<?> buyStocks(@PathVariable(name = "stockId") Long stockId,
      @RequestParam(name = "amount") Integer amount) {
    StockTransactionHistoryResponseDto transaction = stockService.buyStocks(stockId, amount);
    return ResponseEntity.ok().body(transaction);
  }

  // 주식 매도
  @PostMapping("/{stockId}/sell")
  public ResponseEntity<?> sellStocks(@PathVariable(name = "stockId") Long stockId,
      @RequestParam(name = "amount") Integer amount) {
    StockTransactionHistoryResponseDto transaction = stockService.sellStocks(stockId, amount);
    return ResponseEntity.ok().body(transaction);
  }

  // 뉴스 가져오기
  @GetMapping("/{stockId}/news")
  public ResponseEntity<?> getArticle(@PathVariable(name = "stockId") Long stockId) {
    NewsSimpleResponseDto recentNews = stockService.getRecentArticles(stockId);
    return ResponseEntity.ok().body(recentNews);
  }

}
