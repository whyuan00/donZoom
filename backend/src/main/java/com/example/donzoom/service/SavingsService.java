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

    double monthlyDeposit = account.getMonthlyDeposit(); // 매달 적립하는 금액
    double monthlyRate = EARLY_TERMINATION_RATE / 100 / 12; // 월 이자율로 변환
    LocalDateTime now = LocalDateTime.now(); // 현재 날짜
    LocalDateTime startDate = account.getStartDate(); // 적금 시작 날짜

    // 적금 시작일과 현재 날짜 간의 차이를 월 단위로 계산
    long monthsPaid = ChronoUnit.MONTHS.between(startDate, now);
    if (monthsPaid < 0) {
      monthsPaid = 0; // 시작일이 현재 날짜보다 미래인 경우
    }

    // 총 납부된 금액과 이자 계산
    double totalDepositedAmount = monthlyDeposit * monthsPaid;
    double totalInterest = 0.0;

    // 각 월별로 이자 계산
    for (int i = 0; i < monthsPaid; i++) {
      totalInterest += monthlyDeposit * monthlyRate * (monthsPaid - i);
    }

    double totalAmount = totalDepositedAmount + totalInterest;

    // 소수점 첫째 자리까지 올림하여 double로 유지
    double roundedPrincipal = roundToFirstDecimalPlace(totalDepositedAmount);
    double roundedInterest = roundToFirstDecimalPlace(totalInterest);
    double roundedTotalAmount = roundToFirstDecimalPlace(totalAmount);

    return SavingsResponseDto.builder()
        .principal(roundedPrincipal) // 총 납부 금액
        .interest(roundedInterest)   // 이자
        .totalAmount(roundedTotalAmount) // 총 금액
        .build();
  }

  @Transactional
  public SavingsResponseDto calculateMaturityAmount() {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    double monthlyDeposit = account.getMonthlyDeposit(); // 매달 적립하는 금액
    double monthlyRate = DEFAULT_INTEREST_RATE / 100 / 12; // 월 이자율로 변환

    // 이자 계산
    double totalInterest = 0.0;
    for (int i = 0; i < 3; i++) { // 3개월 동안
      totalInterest += monthlyDeposit * monthlyRate * (3 - i); // 남은 개월 수에 따라 이자 계산
    }

    double totalDepositedAmount = monthlyDeposit * 3; // 총 예치금
    double totalAmount = totalDepositedAmount + totalInterest; // 만기 총 금액

    // 소수점 첫째 자리까지 올림하여 double로 유지
    double roundedPrincipal = roundToFirstDecimalPlace(totalDepositedAmount);
    double roundedInterest = roundToFirstDecimalPlace(totalInterest);
    double roundedTotalAmount = roundToFirstDecimalPlace(totalAmount);

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
    wallet.updateCoin(wallet.getCoin() + (int) roundToFirstDecimalPlace(totalAmount));

    // User와의 관계 해제
    user.updateSavingAccount(null);
    userRepository.save(user);

    // SavingAccount 삭제
    savingAccountRepository.delete(account);
    savingAccountRepository.flush();

    return SavingsResponseDto.builder()
        .principal((int) roundToFirstDecimalPlace(account.getTotalDepositedAmount()))
        .interest((int) roundToFirstDecimalPlace(interest))
        .totalAmount((int) roundToFirstDecimalPlace(totalAmount))
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
  public SavingsDetailResponseDto getSavingsDetail(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    SavingAccount account = savingAccountRepository.findByUser(user)
        .orElseThrow(() -> new RuntimeException("No savings account found"));

    // 현재 날짜와 만기일 계산
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime nextPaymentDate = getNextPaymentDate(account.getStartDate());
    long daysUntilNextPayment = ChronoUnit.DAYS.between(now, nextPaymentDate) + 1; // +1 추가
    long daysUntilMaturity = ChronoUnit.DAYS.between(now, account.getMaturityDate());

    // 만기 예상 수익 및 환급액 계산
    double totalExpectedDeposit = account.getMonthlyDeposit() * 3; // 3개월의 총 예치금
    double expectedProfit = calculateTotalInterest(account.getMonthlyDeposit(), DEFAULT_INTEREST_RATE, 3); // 3개월 이자 계산
    double expectedMaturityAmount = totalExpectedDeposit + expectedProfit;

    // 소수점 첫째 자리까지 올림하여 double로 유지
    double roundedCurrentPaidAmount = roundToFirstDecimalPlace(account.getTotalDepositedAmount());
    double roundedMonthlyDeposit = roundToFirstDecimalPlace(account.getMonthlyDeposit());
    double roundedExpectedProfit = roundToFirstDecimalPlace(expectedProfit);
    double roundedExpectedMaturityAmount = roundToFirstDecimalPlace(expectedMaturityAmount);

    return SavingsDetailResponseDto.builder()
        .currentPaidAmount(roundedCurrentPaidAmount)
        .monthlyDeposit(roundedMonthlyDeposit)
        .expectedMaturityAmount(roundedExpectedMaturityAmount)
        .expectedMaturityProfit(roundedExpectedProfit)
        .nextPaymentDue(daysUntilNextPayment >= 0 ? "D-" + daysUntilNextPayment : "D-Day")
        .maturityDate(account.getMaturityDate().toLocalDate().toString())
        .build();
  }

  // 총 이자 계산 메서드
  private double calculateTotalInterest(double monthlyDeposit, double annualRate, int months) {
    double totalInterest = 0.0;
    double monthlyRate = annualRate / 100 / 12; // 연이자율을 월이자율로 변환

    for (int i = 0; i < months; i++) {
      totalInterest += monthlyDeposit * monthlyRate * (months - i); // 남은 기간에 따라 이자 계산
    }

    return totalInterest;
  }

  // 다음 납입일 계산 메서드
  private LocalDateTime getNextPaymentDate(LocalDateTime startDate) {
    // 월 납입일 계산
    LocalDateTime nextPaymentDate = startDate;
    while (nextPaymentDate.isBefore(LocalDateTime.now()) || nextPaymentDate.isEqual(LocalDateTime.now())) {
      nextPaymentDate = nextPaymentDate.plusMonths(1);
    }
    return nextPaymentDate;
  }

  // 소수점 첫째 자리까지 올림하여 변환하는 메서드
  private double roundToFirstDecimalPlace(double value) {
    BigDecimal bd = new BigDecimal(value).setScale(1, RoundingMode.CEILING); // 소수점 첫째 자리까지 올림
    return bd.doubleValue();
  }
}
