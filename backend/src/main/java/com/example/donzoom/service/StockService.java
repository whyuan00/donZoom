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
import com.example.donzoom.entity.TransactionHistory;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.StockHistoryRepository;
import com.example.donzoom.repository.StockRepository;
import com.example.donzoom.repository.StockWalletRepository;
import com.example.donzoom.repository.TransactionHistoryRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.repository.WalletRepository;
import com.example.donzoom.util.SecurityUtil;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockService {

  private final UserService userService;

  private final StockWalletRepository stockWalletRepository;
  private final StockHistoryRepository stockHistoryRepository;
  private final StockRepository stockRepository;
  private final TransactionHistoryRepository transactionHistoryRepository;
  private final WalletRepository walletRepository;

  // 주식 목록 조회
  public StockSimpleResponseDto getAllStocks() {
    List<Long> stockIds = stockRepository.findAll().stream().map(Stock::getId).toList();
    log.info("getAllStocks: {}", stockIds);
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

    List<StockWalletResponseDto> stockWalletDtos = stockWalletRepository.findByWalletId(walletId)
        .stream()
        .map(stockWallet -> StockWalletResponseDto.builder().stockWallet(stockWallet).build())
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
        .realizedProfit(transactionHistory.getRealizedProfit())
        .createdAt(transactionHistory.getCreatedAt())
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
        .realizedProfit(transactionHistory.getRealizedProfit())
        .createdAt(transactionHistory.getCreatedAt())
        .build()).toList();

    return StockTransactionHistorySimpleResponseDto.builder()
        .myHistories(transactionHistoryDtos)
        .build();
  }

  // 매수하기
  @Transactional
  public StockTransactionHistoryResponseDto buyStocks(Long stockId, Integer amount) {
    String email = SecurityUtil.getAuthenticatedUsername();
    User user = userService.findUserByEmail(email);
//    Long walletId = walletService.getWalletId(user.getId());
    Long walletId = user.getId(); // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

    // 내 지갑 찾아오기
    Wallet myWallet = walletRepository.findById(walletId)
        .orElseThrow(() -> new NoSuchElementException("Wallet not found"));

    // 주식 들고오기
    Stock stock = stockRepository.findById(stockId)
        .orElseThrow(() -> new NoSuchElementException("Stock not found"));

    // 주식 현재가 들고오기
    StockHistory recentPrice = stockHistoryRepository.findTop1ByStockIdOrderByCreatedAtDesc(stockId);

    // 지갑 내 유동자산 비교
    Float requiredPrice = recentPrice.getPrice() * amount;
    if (myWallet.getCoin() < requiredPrice) {
      throw new RuntimeException("Not enough money");
    }

    // 매수에 따른 코인 차감
    myWallet.updateCoin((int) (myWallet.getCoin() - requiredPrice));

    // 이미 보유한 주식인지 확인
    List<Long> myStockId = stockWalletRepository.findByWalletId(walletId).stream()
        .map(stockWallet -> stockWallet.getStock().getId()).toList();

    StockWallet savedStockWallet;

    if (myStockId.contains(stockId)) {
      // 기존 주식 업데이트
      StockWallet preStock = stockWalletRepository.findByWalletIdAndStockId(walletId, stockId)
          .orElseThrow(() -> new NoSuchElementException("Stock not found"));

      // 총 투자 금액과 평단가 업데이트
      Float newTotalInvestedPrice = preStock.getTotalInvestedPrice() + requiredPrice;
      Integer newTotalAmount = preStock.getAmount() + amount;

      preStock.updateInvestment(newTotalInvestedPrice, newTotalAmount);
      savedStockWallet = preStock;

    } else {
      // 새로운 주식 매수
      StockWallet newStock = StockWallet.builder()
          .wallet(myWallet)
          .stock(stock)
          .totalInvestedPrice(requiredPrice)  // 초기 투자 금액
          .amount(amount)                      // 초기 수량
          .averagePrice(recentPrice.getPrice()) // 초기 평단가
          .build();

      savedStockWallet = stockWalletRepository.save(newStock);
    }

    // 거래 내역 기록 (매수는 실현 수익이 없음)
    Long transactionHistoryId = createTransactionHistory(myWallet, stock, recentPrice.getPrice(),
        amount, requiredPrice, 0.0f);

    TransactionHistory transactionHistory =
        transactionHistoryRepository.findById(transactionHistoryId).orElseThrow();

    return StockTransactionHistoryResponseDto.builder()
        .transactionHistoryId(transactionHistory.getId())
        .stockId(transactionHistory.getStock().getId())
        .price(transactionHistory.getPrice())
        .amount(transactionHistory.getAmount())
        .total(transactionHistory.getPrice() * transactionHistory.getAmount())
        .realizedProfit(transactionHistory.getRealizedProfit())
        .createdAt(transactionHistory.getCreatedAt())
        .build();

  }

  // 매도하기
  @Transactional
  public StockTransactionHistoryResponseDto sellStocks(Long stockId, Integer amount) {
    String email = SecurityUtil.getAuthenticatedUsername();
    User user = userService.findUserByEmail(email);
//    Long walletId = walletService.getWalletId(user.getId());
    Long walletId = user.getId(); // TODO: 1:1이라 이렇게 해도 상관없긴 하겠다

    // 내 지갑 찾아오기
    Wallet myWallet = walletRepository.findById(walletId)
        .orElseThrow(() -> new NoSuchElementException("Wallet not found"));

    // 주식 들고오기
    Stock stock = stockRepository.findById(stockId)
        .orElseThrow(() -> new NoSuchElementException("Stock not found"));

    // 주식 현재가 들고오기
    StockHistory recentPrice = stockHistoryRepository.findTop1ByStockIdOrderByCreatedAtDesc(stockId);

    // 내가 보유중인 주식인지 확인
    StockWallet preStock = stockWalletRepository.findByWalletIdAndStockId(walletId, stockId)
        .orElseThrow(() -> new NoSuchElementException("Stock not found"));

    // 매도할 수량이 충분한지 확인
    if (preStock.getAmount() < amount) {
      throw new RuntimeException("Insufficient amount");
    }

    // 실현 수익 계산
    Float realizedProfit = (recentPrice.getPrice() - preStock.getAveragePrice()) * amount;

    // 지갑에 실현된 금액 추가
    myWallet.updateCoin((int) (myWallet.getCoin() + recentPrice.getPrice() * amount));

    if (preStock.getAmount().equals(amount)) {
      // 모든 주식을 매도한 경우 삭제
      stockWalletRepository.delete(preStock);
    } else {
      // 남은 주식의 총 투자 금액과 수량 업데이트
      Float remainingInvestedPrice = preStock.getTotalInvestedPrice() - preStock.getAveragePrice() * amount;
      Integer remainingAmount = preStock.getAmount() - amount;

      preStock.updateInvestment(remainingInvestedPrice, remainingAmount);
    }

    // 실현된 수익을 기록
    preStock.updateRealizedProfit(realizedProfit);

    // 거래 내역 기록
    Long transactionHistoryId = createTransactionHistory(myWallet, stock, -recentPrice.getPrice(),
        amount, recentPrice.getPrice() * amount, realizedProfit);

    TransactionHistory transactionHistory = transactionHistoryRepository.findById(
        transactionHistoryId).orElseThrow();

    return StockTransactionHistoryResponseDto.builder()
        .transactionHistoryId(transactionHistory.getId())
        .stockId(transactionHistory.getStock().getId())
        .price(transactionHistory.getPrice())
        .amount(transactionHistory.getAmount())
        .total(transactionHistory.getPrice() * transactionHistory.getAmount())
        .realizedProfit(transactionHistory.getRealizedProfit())
        .createdAt(transactionHistory.getCreatedAt())
        .build();
  }

  // 주식 변동내역 기록
  @Transactional
  public Long createStockHistory(Stock stock, Float price) {
    StockHistory stockHistory = StockHistory.builder().stock(stock).price(price).build();
    stockHistoryRepository.save(stockHistory);
    return stockHistory.getId();
  }

  // 주식 거래내역 기록
  @Transactional
  public Long createTransactionHistory(Wallet wallet, Stock stock, Float price, Integer amount,
      Float totalAmount, Float realizedProfit) {
    TransactionHistory transactionHistory = TransactionHistory.builder()
        .wallet(wallet)
        .stock(stock)
        .price(price)
        .amount(amount)
        .totalAmount(totalAmount)
        .realizedProfit(realizedProfit)
        .build();
    transactionHistoryRepository.save(transactionHistory);
    return transactionHistory.getId();
  }

}
