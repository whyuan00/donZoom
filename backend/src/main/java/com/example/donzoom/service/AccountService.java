package com.example.donzoom.service;

import com.example.donzoom.dto.account.request.TransactionRequestDto;
import com.example.donzoom.dto.account.request.TransferRequestDto;
import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.account.response.AccountResponseDto;
import com.example.donzoom.dto.account.response.BalanceResponseDto;
import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.dto.account.response.TransactionResponseDto;
import com.example.donzoom.dto.account.response.TransferResponseDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.external.BankApi;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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

    //유저정보 가져오기
    User user = getUser();;

    BankUserResponseDto bankUser = bankApi.createMember(user.getEmail());
    // 코인 차감 및 티켓 추가
    user.updateUserKey(bankUser.getUserKey());
    // 변경된 지갑 정보를 저장
    userRepository.save(user);

    return bankUser;
  }

  //사용자 정보 조회
  public BankUserResponseDto getMember() {
    //유저정보 가져오기
    User user = getUser();;

    return bankApi.getMember(user.getEmail());
  }

  //계좌 생성
  public AccountCreateResponseDto createDemandDepositAccount() {
    String accountTypeUniqueNo = "001-1-ffa4253081d540"; //우리가 생성해야함.

    //유저정보 가져오기
    User user = getUser();
    System.out.println(user.getUserKey());

    //유저가 뱅크에 가입되있지 않으면 가입 후 계좌생성
    if(user.getUserKey()==null){
      createMember();
    }

    return bankApi.createDemandDepositAccount(accountTypeUniqueNo,user.getUserKey());
  }

  //계좌정보조회
  public AccountResponseDto getAccountInfo() {

    //유저정보 가져오기
    User user = getUser();
    return bankApi.getAccountInfo(user.getUserKey());
  }

  public TransferResponseDto transfer(TransferRequestDto transferRequestDto) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.transfer(transferRequestDto,user.getUserKey());
  }

  public BalanceResponseDto getBalance(String accountNo) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.getBalance(accountNo,user.getUserKey());
  }

  public TransactionResponseDto getHistory(TransactionRequestDto transactionRequestDto) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.getHistory(transactionRequestDto,user.getUserKey());
  }

  public TransactionResponseDto updateLimit(TransactionRequestDto transactionRequestDto) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.getHistory(transactionRequestDto,user.getUserKey());
  }

  public User getUser(){
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    //유저정보 가져오기
    User user = userRepository.findByEmail("test3@ssafy.com")
        .orElseThrow(() -> new RuntimeException("User not found"));
    return user;
  }
}
