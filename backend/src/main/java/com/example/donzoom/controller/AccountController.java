package com.example.donzoom.controller;

import com.example.donzoom.dto.account.response.AccountCreateResponseDto;
import com.example.donzoom.dto.pig.request.PigRequestDto;
import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.service.AccountService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
  public String createAccount() {
    return accountService.createDemandDepositAccount("temp");
  }

  @GetMapping("/info")
  public String getAccountInfo() {
    return accountService.getAccountInfo();
  }

  @PostMapping("/member")
  public String createMember() {
    return accountService.createMember();
  }
  @GetMapping("/member")
  public String getMember() {
    return accountService.getMember();
  }
}
