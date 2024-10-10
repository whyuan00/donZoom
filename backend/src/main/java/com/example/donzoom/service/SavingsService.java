package com.example.donzoom.service;

import com.example.donzoom.dto.savings.response.SavingsDataResponseDto;
import com.example.donzoom.dto.savings.response.SavingsDetailResponseDto;
import com.example.donzoom.dto.savings.response.SavingsResponseDto;
import com.example.donzoom.entity.SavingAccount;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.SavingAccountRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import java.math.BigDecimal;
import java.math.RoundingMode;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingsService {

  private final SavingAccountRepository savingAccountRepository;
  private final UserRepository userRepository;

  private static final double DEFAULT_INTEREST_RATE = 3.4;
  private static final double EARLY_TERMINATION_RATE = 2.0;

  @Transactional(readOnly = true)
  public SavingsDataResponseDto checkSavingsAccountStatus() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return savingAccountRepository.findByUser(user)
        .map(account -> {
          LocalDateTime now = LocalDateTime.now();
          boolean isMatured = !now.isBefore(account.getMaturityDate());

          return SavingsDataResponseDto.builder()
              .exists(true)
              .status(isMatured ? "만기 해지 가능" : "중도 해지 가능")
              .canTerminate(true)
              .build();
        })
        .orElse(SavingsDataResponseDto.builder()
            .exists(false)
            .status("적금 없음")
            .canTerminate(false)
            .build());
  }

  @Transactional
  public void createSavingsAccount(int monthlyDeposit) {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    LocalDateTime startDate = LocalDateTime.now().truncatedTo(ChronoUnit.DAYS);
    LocalDateTime firstDepositDate = (startDate.getDayOfMonth() == 1)
        ? startDate
        : startDate.plusMonths(1).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
    LocalDateTime maturityDate = firstDepositDate.plusMonths(3);

    SavingAccount savingsAccount = SavingAccount.builder()
        .user(user)
        .monthlyDeposit((double) monthlyDeposit)
        .startDate(firstDepositDate)
        .maturityDate(maturityDate)
        .build();

    savingAccountRepository.save(savingsAccount);
  }

  @Transactional
  public SavingsResponseDto calculateEarlyTerminationAmount() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    double interest = account.calculateInterest(EARLY_TERMINATION_RATE);
    double totalAmount = account.getTotalDepositedAmount() + interest;

    // 올림하여 int로 변환
    int roundedPrincipal = (int) Math.ceil(account.getTotalDepositedAmount());
    int roundedInterest = (int) Math.ceil(interest);
    int roundedTotalAmount = (int) Math.ceil(totalAmount);

    return SavingsResponseDto.builder()
        .principal(roundedPrincipal)
        .interest(roundedInterest)
        .totalAmount(roundedTotalAmount)
        .build();
  }

  @Transactional
  public SavingsResponseDto calculateMaturityAmount() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    double expectedTotalDepositedAmount = account.getMonthlyDeposit() * 3;
    double interest = expectedTotalDepositedAmount * (DEFAULT_INTEREST_RATE / 100);
    double totalAmount = expectedTotalDepositedAmount + interest;

    // 올림하여 int로 변환
    int roundedPrincipal = (int) Math.ceil(expectedTotalDepositedAmount);
    int roundedInterest = (int) Math.ceil(interest);
    int roundedTotalAmount = (int) Math.ceil(totalAmount);

    return SavingsResponseDto.builder()
        .principal(roundedPrincipal)
        .interest(roundedInterest)
        .totalAmount(roundedTotalAmount)
        .build();
  }

  @Transactional
  public SavingsResponseDto terminateSavingsAccount() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    boolean isMatured = LocalDateTime.now().isAfter(account.getMaturityDate()) || LocalDateTime.now().isEqual(account.getMaturityDate());
    double interestRate = isMatured ? DEFAULT_INTEREST_RATE : EARLY_TERMINATION_RATE;
    double interest = account.calculateInterest(interestRate);
    double totalAmount = account.getTotalDepositedAmount() + interest;

    Wallet wallet = user.getWallet();
    wallet.updateCoin(wallet.getCoin() + (int) Math.ceil(totalAmount));

    // User와의 관계 해제
    user.updateSavingAccount(null);
    userRepository.save(user);

    // SavingAccount 삭제
    savingAccountRepository.delete(account);
    savingAccountRepository.flush();

    return SavingsResponseDto.builder()
        .principal((int) Math.ceil(account.getTotalDepositedAmount()))
        .interest((int) Math.ceil(interest))
        .totalAmount((int) Math.ceil(totalAmount))
        .build();
  }

  @Transactional(readOnly = true)
  public boolean canTerminate() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    LocalDateTime now = LocalDateTime.now();
    return !now.isBefore(account.getMaturityDate());
  }

  @Scheduled(cron = "0 50 10 8 10 ?")
  @Transactional
  public void autoDeposit() {
    List<SavingAccount> accounts = savingAccountRepository.findAll();
    for (SavingAccount account : accounts) {
      User user = account.getUser();
      Double monthlyDeposit = account.getMonthlyDeposit();
      Wallet wallet = user.getWallet();

      if (wallet.getCoin() >= monthlyDeposit) {
        wallet.updateCoin(wallet.getCoin() - monthlyDeposit.intValue());
        account.deposit(monthlyDeposit);
        savingAccountRepository.save(account);
      }
    }
  }

  @Transactional(readOnly = true)
  public SavingsDetailResponseDto getSavingsDetail() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    // 현재 날짜와 만기일 계산
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime nextPaymentDate = account.getStartDate().plusMonths((long) Math.ceil(account.getTotalDepositedAmount() / account.getMonthlyDeposit()) + 1);
    long daysUntilNextPayment = ChronoUnit.DAYS.between(now, nextPaymentDate);
    long daysUntilMaturity = ChronoUnit.DAYS.between(now, account.getMaturityDate());

    // 만기 예상 수익 및 환급액 계산
    double totalExpectedDeposit = account.getMonthlyDeposit() * 3;
    double expectedProfit = totalExpectedDeposit * (DEFAULT_INTEREST_RATE / 100);
    double expectedMaturityAmount = totalExpectedDeposit + expectedProfit;

    // 소수점 첫째 자리까지 반올림
    double roundedCurrentPaidAmount = roundToFirstDecimalPlace(account.getTotalDepositedAmount());
    double roundedMonthlyDeposit = roundToFirstDecimalPlace(account.getMonthlyDeposit());
    double roundedExpectedProfit = roundToFirstDecimalPlace(expectedProfit);
    double roundedExpectedMaturityAmount = roundToFirstDecimalPlace(expectedMaturityAmount);

    return SavingsDetailResponseDto.builder()
        .currentPaidAmount(roundedCurrentPaidAmount)
        .monthlyDeposit(roundedMonthlyDeposit)
        .expectedMaturityAmount(roundedExpectedMaturityAmount)
        .expectedMaturityProfit(roundedExpectedProfit)
        .nextPaymentDue(daysUntilNextPayment > 0 ? "D-" + daysUntilNextPayment : "D-Day")
        .maturityDate(account.getMaturityDate().toLocalDate().toString())
        .build();
  }

  // 소수점 첫째 자리까지 반올림하는 메서드
  private double roundToFirstDecimalPlace(double value) {
    BigDecimal bd = new BigDecimal(value).setScale(1, RoundingMode.CEILING);
    return bd.doubleValue();
  }

}
