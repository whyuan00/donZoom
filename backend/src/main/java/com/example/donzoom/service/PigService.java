package com.example.donzoom.service;

import com.example.donzoom.dto.pig.request.PigRequestDto;
import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.entity.MyPig;
import com.example.donzoom.entity.Pig;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.MyPigRepository;
import com.example.donzoom.repository.PigRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.repository.WalletRepository;
import com.example.donzoom.util.SecurityUtil;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class PigService {

  private final MyPigRepository myPigRepository;
  private final PigRepository pigRepository;
  private final WalletRepository walletRepository;
  private final UserRepository userRepository;

  //지갑에있는 돼지 정보 보기
  @Transactional(readOnly = true)
  public List<PigResponseDto> findPigs() {

    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    // user에서  지갑 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Wallet wallet = user.getWallet();

    List<MyPig> myPigs = myPigRepository.findByWallet_Id(
        wallet.getId()); //Wallet ID를 기준으로 MyPigs 엔티티 리스트를 반환
    return myPigs.stream().map(myPig -> PigResponseDto.builder().pigId(myPig.getPig().getId())
            .imageUrl(myPig.getPig().getImageUrl()).pigName(myPig.getPig().getPigName()).build())
        .collect(Collectors.toList());
  }

  //돼지 아이디로 돼지 상세보기
  @Transactional(readOnly = true)
  public PigResponseDto findPigById(Long pigId) {
    Pig pig = pigRepository.findById(pigId)
        .orElseThrow(() -> new IllegalArgumentException("Pig not found with id: " + pigId));

    return PigResponseDto.builder().pigId(pig.getId()).imageUrl(pig.getImageUrl())
        .pigName(pig.getPigName()).build();
  }

  @Transactional
  public List<PigResponseDto> getRandomPigsAndAddToWallet(PigRequestDto pigRequestDto) {
    Integer count = pigRequestDto.getAmount();
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    // user에서  지갑 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Long walletId = user.getWallet().getId();

    // 지갑 조회
    Wallet wallet = walletRepository.findById(walletId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid wallet ID"));

    // 티켓이 충분한지 검사
    if (wallet.getTicket() < count) {
      throw new IllegalArgumentException("돼지를 뽑을만큼 티켓이 없어요");
    }

    List<Pig> allPigs = pigRepository.findAll(); // 모든 Pig 조회

    // 랜덤으로 Pig 선택
    Random random = new Random();
    List<Pig> randomPigs = random.ints(0, allPigs.size()).limit(count).mapToObj(allPigs::get)
        .toList();

    //티켓 쓴 만큼 차감
    wallet.updateTicket(wallet.getTicket() - count);

    // MyPig에 뽑은 돼지 추가
    for (Pig pig : randomPigs) {
      MyPig myPig = MyPig.builder().wallet(wallet).pig(pig).build();
      myPigRepository.save(myPig);
    }

    // PigResponseDto 리스트 반환
    return randomPigs.stream().map(
        pig -> PigResponseDto.builder().pigId(pig.getId()).imageUrl(pig.getImageUrl())
            .pigName(pig.getPigName()).build()).toList();
  }
}
