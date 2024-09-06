package com.example.donzoom.external;

import com.example.donzoom.dto.account.request.CreateMemberDto;
import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.dto.account.response.RecDto;
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


  private final WebClient webClient;

  public BankApi() {
    this.webClient = WebClient.builder()
        .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
        .build();
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
  public AccountCreateResponseDto createDemandDepositAccount(String accountTypeUniqueNo,String userKey) {
    // 요청 본문 구성
    Map<String, Object> requestBody = Map.of(
        "Header", Map.of(
            "apiName", "createDemandDepositAccount",
            "transmissionDate", "20240401",
            "transmissionTime", "105000",
            "institutionCode", "00100",
            "fintechAppNo", "001",
            "apiServiceCode", "createDemandDepositAccount",
            "institutionTransactionUniqueNo", generateUniqueNumber(),
            "apiKey", apiKey,
            "userKey", userKey
        ),
        "accountTypeUniqueNo", accountTypeUniqueNo //상품번호. 일단 임의로해놓음
    );

    return webClient.post()
        .uri(createAccountUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(AccountCreateResponseDto.class)
        .block();
  }

  public String getAccountInfo(String userKey) {
    // 요청 본문 구성
    Map<String, Object> requestBody = Map.of(
        "Header", Map.of(
            "apiName", "inquireDemandDepositAccountList",
            "transmissionDate", "20240401",
            "transmissionTime", "101000",
            "institutionCode", "00100",
            "fintechAppNo", "001",
            "apiServiceCode", "inquireDemandDepositAccountList",
            "institutionTransactionUniqueNo", generateUniqueNumber(),
            "apiKey", apiKey,
            "userKey", userKey
        )
    );


    return webClient.post()
        .uri(getAccountUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(String.class)
        .block();
  }
  private static final Random random = new Random();

  public static String generateUniqueNumber() {
    // 현재 날짜와 시간 얻기
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

    // 날짜와 시간 문자열 생성
    String date = now.format(dateFormatter);
    String time = now.format(timeFormatter);

    // 일련번호 6자리 생성
    String serialNumber = String.format("%06d", random.nextInt(1000000));

    // 최종 채번 생성
    return date + time + serialNumber;
  }

}
