package com.example.donzoom.external;

import com.example.donzoom.dto.account.bank.CreateAccountRequest;
import com.example.donzoom.dto.account.request.CreateMemberDto;
import com.example.donzoom.dto.account.response.RecResponseDto;
import java.util.Map;
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
  public String createMember(String userId) {
    CreateMemberDto member = CreateMemberDto.builder()
        .apiKey(apiKey)
        .userId(userId)
        .build();
    return webClient.post()
        .uri(createMemberUrl)
        .bodyValue(member)
        .retrieve()
        .bodyToMono(String.class)
        .block();
  }
  public String getMember(String userId) {
    CreateMemberDto member = CreateMemberDto.builder()
        .apiKey(apiKey)
        .userId(userId)
        .build();
    return webClient.post()
        .uri(userInfoUrl)
        .bodyValue(member)
        .retrieve()
        .bodyToMono(String.class)
        .block();
  }

  //계좌 생성
  public String createDemandDepositAccount(String accountTypeUniqueNo,String userKey) {
    // 요청 본문 구성
    Map<String, Object> requestBody = Map.of(
        "Header", Map.of(
            "apiName", "createDemandDepositAccount",
            "transmissionDate", "20240401",
            "transmissionTime", "105000",
            "institutionCode", "00100",
            "fintechAppNo", "001",
            "apiServiceCode", "createDemandDepositAccount",
            "institutionTransactionUniqueNo", "20240215121212123473",
            "apiKey", apiKey,
            "userKey", userKey
        ),
        "accountTypeUniqueNo", accountTypeUniqueNo
    );

    return webClient.post()
        .uri(createAccountUrl)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(String.class)
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
            "institutionTransactionUniqueNo", "20240215121212123473",
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


}
