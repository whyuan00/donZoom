package com.example.donzoom.service;

import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.external.BankApi;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

  private final BankApi bankApi;
  private final UserRepository userRepository;

  @Autowired
  public AccountService(BankApi bankApi, UserRepository userRepository) {
    this.bankApi = bankApi;
    this.userRepository = userRepository;
  }

  //뱅크사용자 가입
  public BankUserResponseDto createMember() {
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();

    //유저정보 가져오기
    User user = userRepository.findByEmail("test3@ssafy.com")
        .orElseThrow(() -> new RuntimeException("User not found"));

    BankUserResponseDto bankUser = bankApi.createMember("test3@ssafy.com");
    // 코인 차감 및 티켓 추가
    user.updateUserKey(bankUser.getUserKey());
    // 변경된 지갑 정보를 저장
    userRepository.save(user);

    return bankUser;
  }

  //사용자 정보 조회
  public BankUserResponseDto getMember() {
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    return bankApi.getMember("test3@ssafy.com");
  }

  //계좌 생성
  public String createDemandDepositAccount() {
    String accountTypeUniqueNo = "001-1-ffa4253081d540";
    return bankApi.createDemandDepositAccount(accountTypeUniqueNo,"5da8eb1d-10e6-4210-8c1f-c297674d1e44");
  }

  //계좌정보조회
  public String getAccountInfo() {
    return bankApi.getAccountInfo("5da8eb1d-10e6-4210-8c1f-c297674d1e44");
  }


}
