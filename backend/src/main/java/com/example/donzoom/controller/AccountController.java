package com.example.donzoom.controller;

import com.example.donzoom.dto.account.request.AutoTransferRequestDto;
import com.example.donzoom.dto.account.request.AutoTransferUpdateRequestDto;
import com.example.donzoom.dto.account.request.CreateCardRequestDto;
import com.example.donzoom.dto.account.request.PayRequestDto;
import com.example.donzoom.dto.account.request.TransactionRequestDto;
import com.example.donzoom.dto.account.request.TransferRequestDto;
import com.example.donzoom.dto.account.request.UpdateLimitRequestDto;
import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.account.response.AccountResponseDto;
import com.example.donzoom.dto.account.response.BalanceResponseDto;
import com.example.donzoom.dto.account.response.BankUserResponseDto;
import com.example.donzoom.dto.account.response.CreateCardResponseDto;
import com.example.donzoom.dto.account.response.TransactionResponseDto;
import com.example.donzoom.dto.account.response.TransferResponseDto;
import com.example.donzoom.service.AccountService;
import com.example.donzoom.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  // 자동이체 설정
  @PostMapping("/transfer/auto")
  public ResponseEntity<Void> setAutoTransfer(@RequestBody AutoTransferRequestDto requestDto) {
    accountService.setAutoTransfer(requestDto);
    return ResponseEntity.noContent().build();
  }

  // 자동이체 수정
  @PatchMapping("/transfer/auto")
  public ResponseEntity<Void> setAutoTransfer(@RequestBody AutoTransferUpdateRequestDto requestDto) {
    accountService.updateAutoTransfer(requestDto);
    return ResponseEntity.noContent().build();
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

  // 자녀의 1일 결제 한도 수정
  @PutMapping("/daily-limit")
  public ResponseEntity<Void> updateDailyLimit(
      @RequestBody UpdateLimitRequestDto updateLimitRequestDto) {
    accountService.updateDailyLimit(updateLimitRequestDto);
    return ResponseEntity.ok().build();
  }

  // 자녀의 1회 결제 한도 수정
  @PutMapping("/per-transaction-limit")
  public ResponseEntity<Void> updatePerTransactionLimit(
      @RequestBody UpdateLimitRequestDto updateLimitRequestDto) {
    accountService.updatePerTransactionLimit(updateLimitRequestDto);
    return ResponseEntity.ok().build();
  }

  //카드발금
  @PostMapping("/card")
  public ResponseEntity<CreateCardResponseDto> createCard(@RequestBody CreateCardRequestDto createCardRequestDto) {
    CreateCardResponseDto response = accountService.createCard(createCardRequestDto);
    return ResponseEntity.ok(response);
  }
//  @PostMapping("/member")
//  public BankUserResponseDto createMember() {
//    return accountService.createMember();
//  }
//카드발금
@PostMapping("/payment")
public ResponseEntity<Void> pay(@RequestBody PayRequestDto payRequestDto) {
  accountService.pay(payRequestDto);
  return ResponseEntity.ok().build();
}
  @GetMapping("/member")
  public BankUserResponseDto getMember() {
    return accountService.getMember();
  }
}
