package com.example.donzoom.service;

import com.example.donzoom.dto.stock.response.StockDetailResponseDto;
import com.example.donzoom.dto.stock.response.StockResponseDto;
import com.example.donzoom.dto.stock.response.StockSimpleResponseDto;
import com.example.donzoom.dto.stock.response.StockTransactionHistoryResponseDto;
import com.example.donzoom.dto.stock.response.StockTransactionHistorySimpleResponseDto;
import com.example.donzoom.dto.stock.response.StockWalletResponseDto;
import com.example.donzoom.dto.stock.response.StockWalletSimpleResponseDto;
import com.example.donzoom.dto.stockHistory.response.StockHistoryResponseDto;
import com.example.donzoom.entity.Stock;
import com.example.donzoom.entity.StockHistory;
import com.example.donzoom.entity.StockWallet;
import com.example.donzoom.repository.StockHistoryRepository;
import com.example.donzoom.repository.StockRepository;
import com.example.donzoom.repository.StockWalletRepository;
import com.example.donzoom.repository.TransactionHistoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

  private final TransactionHistoryRepository tHistoryRepository;
  private final StockWalletRepository stockWalletRepository;
  private final StockHistoryRepository stockHistoryRepository;
  private final StockRepository stockRepository;
  private final TransactionHistoryRepository transactionHistoryRepository;

  // 주식 목록 조회
  public StockSimpleResponseDto getAllStocks() {
    List<Long> stockIds = stockRepository.findAll().stream().map(Stock::getId).toList();

    List<StockHistory> recentPrices = stockIds.stream()
        .map(stockHistoryRepository::findTop1ByStockIdOrderByCreatedAtDesc)
        .toList();

    List<StockDetailResponseDto> stockDtos = recentPrices.stream()
        .map(stockHistory -> StockDetailResponseDto.builder()
            .stockId(stockHistory.getStock().getId())
            .stockName(stockHistory.getStock().getStockName())
            .stockPrice(stockHistory.getPrice())
            .lastCreatedAt(stockHistory.getCreatedAt())
            .build()).toList();

    return StockSimpleResponseDto.builder().stocks(stockDtos).build();
  }

  // 주식 상세 조회
  public StockResponseDto getStockById(Long stockId) {
    Stock stock = stockRepository.findById(stockId).orElseThrow();
    List<StockHistory> stockHistories = stockHistoryRepository.findByStockId(stockId);

    List<StockHistoryResponseDto> stockHistoryDtos = stockHistories.stream()
        .map(stockHistory -> StockHistoryResponseDto.builder()
            .stockHistoryId(stockHistory.getId())
            .price(stockHistory.getPrice())
            .createdAt(stockHistory.getCreatedAt())
            .build()).toList();

    return StockResponseDto.builder()
        .stockId(stock.getId())
        .stockName(stock.getStockName())
        .stockHistories(stockHistoryDtos)
        .build();
  }

  // 내 주식 조회
  public StockWalletSimpleResponseDto getAllMyStock(Long userId) {
//    Long walletId = walletService.getWalletId(userId);
    Long walletId = userId; // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다
    List<StockWalletResponseDto> stockWalletDtos = stockWalletRepository.findByWalletId(walletId).stream()
        .map(stockWallet -> StockWalletResponseDto.builder()
            .stockWalletId(stockWallet.getId())
            .stockId(stockWallet.getStock().getId())
            .stockName(stockWallet.getStock().getStockName())
            .price(stockWallet.getPrice())
            .amount(stockWallet.getAmount())
            .build())
        .toList();

    return StockWalletSimpleResponseDto.builder()
        .myStocks(stockWalletDtos)
        .build();
  }

  public StockTransactionHistorySimpleResponseDto getAllTransaction(Long userId) {
    //    Long walletId = walletService.getWalletId(userId);
    Long walletId = userId; // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

    List<StockTransactionHistoryResponseDto> transactionHistoryDtos = transactionHistoryRepository.findByWalletId(
        walletId).stream().map(transactionHistory
        -> StockTransactionHistoryResponseDto.builder()
        .transactionHistoryId(transactionHistory.getId())
        .stockId(transactionHistory.getStock().getId())
        .price(transactionHistory.getPrice())
        .amount(transactionHistory.getAmount())
        .total(transactionHistory.getPrice() * transactionHistory.getAmount())
//        .createdAt(transactionHistory.getCreatedAt())
        .build()).toList();

    return StockTransactionHistorySimpleResponseDto.builder()
        .myHistories(transactionHistoryDtos)
        .build();
  }

  public StockTransactionHistorySimpleResponseDto getTransaction(Long userId, Long stockId) {
    //    Long walletId = walletService.getWalletId(userId);
    Long walletId = userId; // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

    List<StockTransactionHistoryResponseDto> transactionHistoryDtos = transactionHistoryRepository.findByWalletIdAndStockId(
        walletId, stockId).stream().map(transactionHistory
        -> StockTransactionHistoryResponseDto.builder()
        .transactionHistoryId(transactionHistory.getId())
        .stockId(transactionHistory.getStock().getId())
        .price(transactionHistory.getPrice())
        .amount(transactionHistory.getAmount())
        .total(transactionHistory.getPrice() * transactionHistory.getAmount())
//        .createdAt(transactionHistory.getCreatedAt())
        .build()).toList();

    return StockTransactionHistorySimpleResponseDto.builder()
        .myHistories(transactionHistoryDtos)
        .build();
  }
}
