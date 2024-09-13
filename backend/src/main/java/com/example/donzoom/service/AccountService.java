package com.example.donzoom.service;

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
import com.example.donzoom.dto.account.response.CardListRecDto;
import com.example.donzoom.dto.account.response.CardListResponseDto;
import com.example.donzoom.dto.account.response.CreateCardResponseDto;
import com.example.donzoom.dto.account.response.TransactionResponseDto;
import com.example.donzoom.dto.account.response.TransferResponseDto;
import com.example.donzoom.entity.AutoTransfer;
import com.example.donzoom.entity.User;
import com.example.donzoom.external.BankApi;
import com.example.donzoom.repository.AutoTransferRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import com.example.donzoom.util.StoreMappingUtil;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AccountService {

  private final BankApi bankApi;
  private final UserRepository userRepository;
  private final AutoTransferRepository autoTransferRepository;

  @Autowired
  public AccountService(BankApi bankApi, UserRepository userRepository,
      AutoTransferRepository autoTransferRepository) {
    this.bankApi = bankApi;
    this.userRepository = userRepository;
    this.autoTransferRepository = autoTransferRepository;
  }

  //뱅크사용자 가입
  public BankUserResponseDto createMember() {

    //유저정보 가져오기
    User user = getUser();
    ;

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
    User user = getUser();
    ;

    return bankApi.getMember(user.getEmail());
  }

  //계좌 생성
  public AccountCreateResponseDto createDemandDepositAccount() {
    String accountTypeUniqueNo = "001-1-ffa4253081d540"; //우리가 생성해야함.

    //유저정보 가져오기
    User user = getUser();
    log.info(user.getUserKey());

    //유저가 뱅크에 가입되있지 않으면 가입 후 계좌생성
    if (user.getUserKey() == null) {
      createMember();
    }

    return bankApi.createDemandDepositAccount(accountTypeUniqueNo, user.getUserKey());
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
    return bankApi.transfer(transferRequestDto, user.getUserKey());
  }

  public BalanceResponseDto getBalance(String accountNo) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.getBalance(accountNo, user.getUserKey());
  }

  public TransactionResponseDto getHistory(TransactionRequestDto transactionRequestDto) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.getHistory(transactionRequestDto, user.getUserKey());
  }

  // 1일 결제 한도 수정
  public void updateDailyLimit(UpdateLimitRequestDto updateLimitRequestDto) {
    User child = userRepository.findById(Long.parseLong(updateLimitRequestDto.getChildId()))
        .orElseThrow(() -> new RuntimeException("User not found"));
    child.updateDailyLimit(Long.parseLong(updateLimitRequestDto.getLimit()));
    userRepository.save(child);
  }

  // 1회 결제 한도 수정
  public void updatePerTransactionLimit(UpdateLimitRequestDto updateLimitRequestDto) {
    User child = userRepository.findById(Long.parseLong(updateLimitRequestDto.getChildId()))
        .orElseThrow(() -> new RuntimeException("User not found"));
    child.updatePerTransactionLimit(Long.parseLong(updateLimitRequestDto.getLimit()));
    userRepository.save(child);
  }

  //카드생성
  public CreateCardResponseDto createCard(CreateCardRequestDto createCardRequestDto) {
    //유저정보 가져오기
    User user = getUser();
    return bankApi.createCard(createCardRequestDto, user.getUserKey());
  }

  public void setAutoTransfer(AutoTransferRequestDto autoTransferRequestDto) {
    // 현재 유저 정보 가져오기
    User user = getUser();

    // 자동이체 정보를 DB에 저장
    AutoTransfer autoTransfer = AutoTransfer.builder()
        .withdrawalAccountNo(autoTransferRequestDto.getWithdrawalAccountNo())
        .depositAccountNo(autoTransferRequestDto.getDepositAccountNo())
        .transactionBalance(autoTransferRequestDto.getTransactionBalance())
        .transferDate(autoTransferRequestDto.getTransferDate()).userKey(user.getUserKey())
        .user(user)  // User 객체 설정
        .build();

    // AutoTransfer를 저장하기 전에 User의 autoTransfers에 추가
    user.getAutoTransfers().add(autoTransfer);
    userRepository.save(user);  // User를 저장하면 연관된 AutoTransfer도 저장됨

    // 자동이체 정보를 저장하거나 로깅 등 처리
    log.info("자동이체가 설정되었습니다. 출금 계좌: {}, 입금 계좌: {}, 금액: {}, 날짜: {}",
        autoTransferRequestDto.getWithdrawalAccountNo(),
        autoTransferRequestDto.getDepositAccountNo(),
        autoTransferRequestDto.getTransactionBalance(), autoTransferRequestDto.getTransferDate());
  }

  // 자동이체 정보 수정
  public void updateAutoTransfer(AutoTransferUpdateRequestDto updateRequestDto) {
    // 현재 유저 정보 가져오기
    User user = getUser();

    // 입금계좌와 출금계좌로 자동이체 정보 찾기
    AutoTransfer autoTransfer = autoTransferRepository.findByWithdrawalAccountNoAndDepositAccountNo(
            updateRequestDto.getWithdrawalAccountNo(), updateRequestDto.getDepositAccountNo())
        .orElseThrow(() -> new RuntimeException("AutoTransfer not found"));

    // 해당 자동이체가 현재 유저의 것이 맞는지 확인
    if (!autoTransfer.getUser().equals(user)) {
      throw new RuntimeException("Unauthorized to update this AutoTransfer");
    }

    // 자동이체 정보 수정
    if (updateRequestDto.getTransactionBalance() != null) {
      autoTransfer.updateTransactionBalance(updateRequestDto.getTransactionBalance());
    }
    if (updateRequestDto.getTransferDate() != null) {
      autoTransfer.updateTransferDate(updateRequestDto.getTransferDate());
    }

    // 수정된 자동이체 정보 저장
    autoTransferRepository.save(autoTransfer);

    // 로그 남기기
    log.info("자동이체 정보가 수정되었습니다. 출금 계좌: {}, 입금 계좌: {}, 금액: {}, 날짜: {}",
        updateRequestDto.getWithdrawalAccountNo(), updateRequestDto.getDepositAccountNo(),
        updateRequestDto.getTransactionBalance(), updateRequestDto.getTransferDate());
  }

  public void executeTransfer(AutoTransfer autoTransfer) {
    TransferRequestDto transferRequestDto = TransferRequestDto.builder()
        .withdrawalAccountNo(autoTransfer.getWithdrawalAccountNo())
        .depositAccountNo(autoTransfer.getDepositAccountNo())
        .transactionBalance(autoTransfer.getTransactionBalance()).depositTransactionSummary("자동이체")
        .withdrawalTransactionSummary("자동이체").build();

    bankApi.transfer(transferRequestDto, autoTransfer.getUserKey());  // 이체 API 호출
  }

  public void pay(PayRequestDto payRequestDto) {
    // 유저정보 가져오기
    User user = getUser();

    // 결제 금액
    Long paymentBalance = payRequestDto.getPaymentBalance();

    // 유저의 1일한도와 1회한도를 검증
    if (user.getDailyUsageAmount() + paymentBalance > user.getDailyLimit()) {
      throw new RuntimeException("1일 한도 초과");
    }

    if (paymentBalance > user.getPerTransactionLimit()) {
      throw new RuntimeException("1회 결제 한도 초과");
    }

    // 유저의 1일 사용 금액 업데이트
    user.updateDailyUsageAmount(user.getDailyUsageAmount() + paymentBalance);

    userRepository.save(user); // 유저 정보 업데이트

    // 신용카드 결제 -> 신용카드에 연동된 계좌에서 빠져나가도록
    String accountNo = getAccountNoFromCardNo(user, payRequestDto);
    log.info("Account No: {}", accountNo);

    // merchantId로 storeName 조회
    String storeName = StoreMappingUtil.getStoreNameByMerchantId(payRequestDto.getMerchantId());

    // 계좌에서 돈 빼내기
    bankApi.withdrawal(accountNo, paymentBalance, storeName, user.getUserKey());

    // 유저의 1일 한도 넘게되면 추가 처리 (예: 알림, 로깅 등)
  }


  public String getAccountNoFromCardNo(User user, PayRequestDto payRequestDto) {
    //내 카드 목록 조회
    CardListResponseDto response = bankApi.getMyCards(user.getUserKey());
    List<CardListRecDto> cards = response.getREC();  // REC 리스트 추출

    // 가져온 카드 목록에서 결제 요청한 카드 번호에 해당하는 계좌 번호 찾기
    return cards.stream()
        .filter(card -> card.getCardNo().equals(payRequestDto.getCardNo()))  // 카드 번호가 일치하는지 확인
        .findFirst()  // 첫 번째 일치하는 카드 찾기
        .map(CardListRecDto::getWithdrawalAccountNo)  // 해당 카드의 계좌 번호 추출
        .orElseThrow(() -> new IllegalArgumentException("해당 카드 번호에 해당하는 계좌가 없습니다."));  // 없으면 예외 발생
  }

  public User getUser() {
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    //유저정보 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    return user;
  }
}
