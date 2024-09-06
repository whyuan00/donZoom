package com.example.donzoom.service;

import com.example.donzoom.dto.pig.request.TicketPurchaseRequestDto;
import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.repository.WalletRepository;
import com.example.donzoom.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class WalletService {

  private final WalletRepository walletRepository;
  private final UserRepository userRepository;
  @Value("${ticketPrice}")
  private int ticketPrice;

  //가상머니로 돼지뽑기권 구매하기
  public void buyTicket(TicketPurchaseRequestDto ticketPurchaseRequestDto){

    int amount = ticketPurchaseRequestDto.getAmount();
    int totalPrice = amount*ticketPrice;

    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    // user에서  지갑 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Long walletId = user.getWallet().getId();

    // 지갑을 ID로 조회
    Wallet wallet = walletRepository.findById(walletId)
        .orElseThrow(() -> new IllegalArgumentException("해당 id를 가진 지갑을 찾을 수 없음: " + walletId));

    // 지갑의 코인 확인 후 충분한지 검사
    if (wallet.getCoin() < totalPrice) {
      throw new IllegalArgumentException("티켓을 살만큼 코인이 없어요");
    }

    // 코인 차감 및 티켓 추가
    wallet.updateCoin(wallet.getCoin() - totalPrice);
    wallet.updateTicket(wallet.getTicket() + amount);

    // 변경된 지갑 정보를 저장
    walletRepository.save(wallet);

  }


}
