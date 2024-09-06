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
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.StockHistoryRepository;
import com.example.donzoom.repository.StockRepository;
import com.example.donzoom.repository.StockWalletRepository;
import com.example.donzoom.repository.TransactionHistoryRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

  private final UserService userService;

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
  public StockWalletSimpleResponseDto getAllMyStock() {
    String email = SecurityUtil.getAuthenticatedUsername();
    User user = userService.findUserByEmail(email);
//    Long walletId = walletService.getWalletId(user.getId());
    Long walletId = user.getId(); // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

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

  // 모든 주식 거래내역 조회
  public StockTransactionHistorySimpleResponseDto getAllTransaction() {
    String email = SecurityUtil.getAuthenticatedUsername();
    User user = userService.findUserByEmail(email);
//    Long walletId = walletService.getWalletId(user.getId());
    Long walletId = user.getId(); // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

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

  // 주식 종목별 거래내역 조회
  public StockTransactionHistorySimpleResponseDto getTransaction(Long stockId) {
    String email = SecurityUtil.getAuthenticatedUsername();
    User user = userService.findUserByEmail(email);
//    Long walletId = walletService.getWalletId(user.getId());
    Long walletId = user.getId(); // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

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

  // 주식 매수
//  public Long buyStocks(Long stockId, Integer amount) {
//
//    String email = SecurityUtil.getAuthenticatedUsername();
//    User user = userService.findUserByEmail(email);
////    Long walletId = walletService.getWalletId(user.getId());
//    Long walletId = user.getId(); // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다
//
//    // 지갑을 찾아와서
////    Wallet myWallet = stockWalletRepository.findByWalletId(walletId);
//
//    // 주식 현재가 들고오기
//    StockHistory top1ByStockIdOrderByCreatedAtDesc =
//        stockHistoryRepository.findTop1ByStockIdOrderByCreatedAtDesc(stockId);
//
//    // 지갑 내 유동자산이랑 비교
////    if(myWa)
//
//    return 1L;
//  }

}
