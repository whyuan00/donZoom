package com.example.donzoom.controller;

import com.example.donzoom.constant.MissionStatus;
import com.example.donzoom.dto.mission.request.MissionCreateDto;
import com.example.donzoom.dto.mission.request.MissionUpdateDto;
import com.example.donzoom.dto.mission.response.MissionResponseDto;
import com.example.donzoom.dto.user.response.CoinResponseDto;
import com.example.donzoom.entity.Mission;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.service.MissionService;
import com.example.donzoom.service.UserService;
import com.example.donzoom.service.WalletService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/coin")
public class CoinController {

  private final MissionService missionService;
  private final WalletService walletService;
  private final UserService userService;

  @GetMapping
  public ResponseEntity<?> getMyCoin() {
    User loginUser = userService.findCurrentUser();
    return getCoin(loginUser.getId());
  }

  @GetMapping("/{userId}")
  public ResponseEntity<?> getCoin(@PathVariable Long userId) {
    Wallet wallet = walletService.findWalletByUserId(userId);
    Integer coin = wallet.getCoin();
    return new ResponseEntity<>(CoinResponseDto.builder().coin(coin).build() ,HttpStatus.OK);
  }


}
