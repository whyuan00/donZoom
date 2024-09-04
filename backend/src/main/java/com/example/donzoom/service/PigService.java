package com.example.donzoom.service;

import com.example.donzoom.entity.MyPig;
import com.example.donzoom.entity.Pig;
import com.example.donzoom.repository.MyPigRepository;
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

  public List<Pig> getPigs(long walletId) {
    List<MyPig> myCollections = myPigRepository.findByWallet_WalletId(walletId);
    return myCollections.stream()
        .map(MyPig::getPig)
        .collect(Collectors.toList());
  }
}
