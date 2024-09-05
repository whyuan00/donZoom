package com.example.donzoom.service;

import com.example.donzoom.external.BankApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

  private final BankApi bankApi;

  @Autowired
  public AccountService(BankApi bankApi) {
    this.bankApi = bankApi;
  }
  public String createDemandDepositAccount(String accountTypeUniqueNo) {
    return bankApi.createDemandDepositAccount(accountTypeUniqueNo);
  }

  public String getAccountInfo() {
    return bankApi.getAccountInfo("5da8eb1d-10e6-4210-8c1f-c297674d1e44");
  }

  public String createMember() {
    return bankApi.createMember("test2@ssafy.com");
  }

  public String getMember() {
    return bankApi.getMember("test2@ssafy.com");
  }
}
