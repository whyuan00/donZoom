package com.example.donzoom.external;

import com.example.donzoom.dto.account.request.CreateCardRequestDto;
import com.example.donzoom.dto.account.request.CreateMemberDto;
import com.example.donzoom.dto.account.request.TransactionRequestDto;
import com.example.donzoom.dto.account.request.TransferRequestDto;
import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.account.response.AccountResponseDto;
import com.example.donzoom.dto.account.response.BalanceResponseDto;
import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.dto.account.response.CreateCardResponseDto;
import com.example.donzoom.dto.account.response.TransactionResponseDto;
import com.example.donzoom.dto.account.response.TransferResponseDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Random;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

@Slf4j
@Component
public class BankApi {

  @Value("${fin.api-key}")
  private String apiKey;
  @Value("${fin.base-url}")
  private String baseUrl;
  @Value("${fin.create-demand-deposit-account-url}")
  private String createAccountUrl;
  @Value("${fin.inquire-demand-deposit-account-list-url}")
  private String getAccountUrl;
  @Value("${fin.generate-user-key-url}")
  private String createMemberUrl;
  @Value("${fin.user-info-url}")
  private String userInfoUrl;
  @Value("${fin.update-demand-deposit-account-transfer-url}")
  private String transferUrl;
  @Value("${fin.inquire-demand-deposit-account-balance-url}")
  private String getBalanceUrl;
  @Value("${fin.inquire-transaction-history-list-url}")
  private String getTransactionUrl;
  @Value("${fin.create-credit-card-url}")
  private String createCarUrl;

  private final WebClient webClient;

  public BankApi() {
    this.webClient = WebClient.builder()
        .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
        .build();
  }

  private Map<String, Object> createHeader(String apiName, String userKey) {
    return Map.of(
        "Header", Map.of(
            "apiName", apiName,
            "transmissionDate", getDate(),
            "transmissionTime", getTime(),
            "institutionCode", "00100",
            "fintechAppNo", "001",
            "apiServiceCode", apiName,
            "institutionTransactionUniqueNo", generateUniqueNumber(),
            "apiKey", apiKey,
            "userKey", userKey
        )
    );
  }

  //회원생성
  public BankUserResponseDto createMember(String userId) {
    CreateMemberDto member = CreateMemberDto.builder()
        .apiKey(apiKey)
        .userId(userId)
        .build();
    return webClient.post()
        .uri(createMemberUrl)
        .bodyValue(member)
        .retrieve()
        .bodyToMono(BankUserResponseDto.class)
        .block();
  }

  public BankUserResponseDto getMember(String userId) {
    CreateMemberDto member = CreateMemberDto.builder()
        .apiKey(apiKey)
        .userId(userId)
        .build();
    return webClient.post()
        .uri(userInfoUrl)
        .bodyValue(member)
        .retrieve()
        .bodyToMono(BankUserResponseDto.class)
        .block();
  }

  //계좌 생성
  public AccountCreateResponseDto createDemandDepositAccount(String accountTypeUniqueNo,
      String userKey) {
    Map<String, Object> requestBody = Map.of(
        "Header", createHeader("createDemandDepositAccount", userKey),
        "accountTypeUniqueNo", accountTypeUniqueNo
    );

    return webClient.post()
        .uri(createAccountUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(AccountCreateResponseDto.class)
        .block();
  }

  public AccountResponseDto getAccountInfo(String userKey) {
    Map<String, Object> requestBody = createHeader("inquireDemandDepositAccountList", userKey);

    return webClient.post()
        .uri(getAccountUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(AccountResponseDto.class)
        .block();
  }

  public TransferResponseDto transfer(TransferRequestDto transferRequestDto, String userKey) {
    Map<String, Object> requestBody = Map.of(
        "Header", createHeader("updateDemandDepositAccountTransfer", userKey),
        "depositAccountNo", transferRequestDto.getDepositAccountNo(),
        "depositTransactionSummary", transferRequestDto.getDepositTransactionSummary(),
        "transactionBalance", transferRequestDto.getTransactionBalance(),
        "withdrawalAccountNo", transferRequestDto.getWithdrawalAccountNo(),
        "withdrawalTransactionSummary", transferRequestDto.getDepositTransactionSummary()
    );

    return webClient.post()
        .uri(transferUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(TransferResponseDto.class)
        .block();
  }

  public BalanceResponseDto getBalance(String accountNo, String userKey) {
    Map<String, Object> requestBody = Map.of(
        "Header", createHeader("inquireDemandDepositAccountBalance", userKey),
        "accountNo", accountNo
    );

    return webClient.post()
        .uri(getBalanceUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(BalanceResponseDto.class)
        .block();
  }

  public TransactionResponseDto getHistory(TransactionRequestDto transactionRequestDto,
      String userKey) {
    Map<String, Object> requestBody = Map.of(
        "Header", createHeader("inquireTransactionHistoryList", userKey),
        "accountNo", transactionRequestDto.getAccountNo(),
        "startDate", transactionRequestDto.getStartDate(),
        "endDate", transactionRequestDto.getEndDate(),
        "transactionType", transactionRequestDto.getTransactionType(),
        "orderByType", transactionRequestDto.getOrderByType()
    );

    return webClient.post()
        .uri(getTransactionUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(TransactionResponseDto.class)
        .block();
  }

  public CreateCardResponseDto createCard(CreateCardRequestDto createCardRequestDto,
      String userKey) {
    Map<String, Object> requestBody = Map.of(
        "Header", createHeader("createCreditCard", userKey),
        "cardUniqueNo", createCardRequestDto.getCardUniqueNo(),
        "withdrawalAccountNo", createCardRequestDto.getWithdrawalAccountNo(),
        "withdrawalDate", createCardRequestDto.getWithdrawalDate()
    );

    return webClient.post()
        .uri(createCarUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(CreateCardResponseDto.class)
        .block();
  }

  private static final Random random = new Random();

  private static String generateUniqueNumber() {
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

    String date = now.format(dateFormatter);
    String time = now.format(timeFormatter);
    String serialNumber = String.format("%06d", random.nextInt(1000000));
    log.info(date + time + serialNumber);
    return date + time + serialNumber;
  }

  private static String getDate() {
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    return now.format(dateFormatter);
  }

  private static String getTime() {
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");
    return now.format(timeFormatter);
  }
}
