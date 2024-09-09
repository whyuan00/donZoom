package com.example.donzoom.controller;

import com.example.donzoom.dto.account.request.TransactionRequestDto;
import com.example.donzoom.dto.account.request.TransferRequestDto;
import com.example.donzoom.dto.account.request.UpdateLimitRequestDto;
import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.account.response.AccountResponseDto;
import com.example.donzoom.dto.account.response.BalanceResponseDto;
import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.dto.account.response.TransactionResponseDto;
import com.example.donzoom.dto.account.response.TransferResponseDto;
import com.example.donzoom.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

//  계좌 생성
//  fin.create-demand-deposit-account-url=${fin.base-url}/edu/demandDeposit/createDemandDepositAccount
  private final AccountService accountService;

  @PostMapping
  public AccountCreateResponseDto createAccount() {
    return accountService.createDemandDepositAccount();
  }

  @GetMapping
  public AccountResponseDto getAccountInfo() {
    return accountService.getAccountInfo();
  }

  //송금
  @PostMapping("/transfer")
  public ResponseEntity<TransferResponseDto> transfer(@RequestBody TransferRequestDto transferRequestDto) {
    TransferResponseDto response = accountService.transfer(transferRequestDto);
    return ResponseEntity.ok(response);
  }
  //계좌잔액조회
  @GetMapping(value = "/balance")
  public ResponseEntity<BalanceResponseDto> getBalance(
      @RequestParam("accountNo") String accountNo) {

    BalanceResponseDto response = accountService.getBalance(accountNo);
    return ResponseEntity.ok(response);
  }

  //거래내역조회
  @GetMapping(value = "/history")
  public ResponseEntity<TransactionResponseDto> getHistory(
      @RequestBody TransactionRequestDto transactionRequestDto) {

    TransactionResponseDto response = accountService.getHistory(transactionRequestDto);
    return ResponseEntity.ok(response);
  }

//  //결제 한도 설정
//  @PatchMapping(value = "/limit")
//  public ResponseEntity<TransactionResponseDto> updateLimit(
//      @RequestBody UpdateLimitRequestDto updateLimitRequestDto) {
//
//    TransactionResponseDto response = accountService.updateLimt(updateLimitRequestDto);
//    return ResponseEntity.ok(response);
//  }

//  @PostMapping("/member")
//  public BankUserResponseDto createMember() {
//    return accountService.createMember();
//  }

  @GetMapping("/member")
  public BankUserResponseDto getMember() {
    return accountService.getMember();
  }
}
