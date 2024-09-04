package com.example.donzoom.service;

import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.entity.MyPig;
import com.example.donzoom.entity.Pig;
import com.example.donzoom.repository.MyPigRepository;
import com.example.donzoom.repository.PigRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class PigService {

  private final MyPigRepository myPigRepository;
  private final PigRepository pigRepository;

  //지갑에있는 돼지 정보 보기
  public List<PigResponseDto> getPigs(long walletId) {
    List<MyPig> myPigs = myPigRepository.findByWallet_WalletId(walletId);
    return myPigs.stream()
        .map(myPig -> PigResponseDto.builder()
            .collectionId(myPig.getPig().getCollectionId())
            .imageUrl(myPig.getPig().getImageUrl())
            .collectionName(myPig.getPig().getCollectionName())
            .build())
        .collect(Collectors.toList());
  }

  //돼지 아이디로 돼지 상세보기
  public PigResponseDto getPigById(Long pigId) {
    Pig pig = pigRepository.findById(pigId)
        .orElseThrow(() -> new IllegalArgumentException("Pig not found with id: " + pigId));

    return PigResponseDto.builder()
        .collectionId(pig.getCollectionId())
        .imageUrl(pig.getImageUrl())
        .collectionName(pig.getCollectionName())
        .build();
  }
}
