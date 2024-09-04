package com.example.donzoom.service;

import com.example.donzoom.dto.pig.request.TicketPurchaseRequestDto;
import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class WalletService {

  private final WalletRepository walletRepository;

  //가상머니로 돼지뽑기권 구매하기
  public void buyTicket(TicketPurchaseRequestDto ticketPurchaseRequestDto,Long walletId){
    int amount = ticketPurchaseRequestDto.getAmount();
    int ticketPrice = 5;
    int totalPrice = amount*ticketPrice;

    // 지갑을 ID로 조회
    Wallet wallet = walletRepository.findById(walletId)
        .orElseThrow(() -> new IllegalArgumentException("해당 id를 가진 지갑을 찾을 수 없음: " + walletId));

    // 지갑의 코인 확인 후 충분한지 검사
    if (wallet.getCoin() < totalPrice) {
      throw new IllegalArgumentException("티켓을 살만큼 코인이 없어요");
    }

    // 코인 차감 및 티켓 추가
    wallet.setCoin(wallet.getCoin() - totalPrice);
    wallet.setTicket(wallet.getTicket() + amount);

    // 변경된 지갑 정보를 저장
    walletRepository.save(wallet);

  }


}
