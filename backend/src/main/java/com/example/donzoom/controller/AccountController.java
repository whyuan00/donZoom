package com.example.donzoom.controller;

import com.example.donzoom.dto.account.request.TransferRequestDto;
import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.account.response.AccountResponseDto;
import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.dto.account.response.TransferResponseDto;
import com.example.donzoom.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
  @PostMapping(value = "/balance")
  public ResponseEntity<TransferResponseDto> getBalance(
      @RequestParam("accountNo") String accountNo) {

    TransferResponseDto response = accountService.transfer(accountId, amount, transferRequestDto);
    return ResponseEntity.ok(response);
  }
//  @PostMapping("/member")
//  public BankUserResponseDto createMember() {
//    return accountService.createMember();
//  }

  @GetMapping("/member")
  public BankUserResponseDto getMember() {
    return accountService.getMember();
  }
}
