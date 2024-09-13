package com.example.donzoom.controller;

import com.example.donzoom.dto.pig.request.PigRequestDto;
import com.example.donzoom.dto.pig.request.TicketPurchaseRequestDto;
import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.service.PigService;
import com.example.donzoom.service.WalletService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/pig")
public class PigController {

  private final PigService pigService;
  private final WalletService walletService;

  @GetMapping
  public ResponseEntity<List<PigResponseDto>> getPigs() {
    try {
      List<PigResponseDto> pigs = pigService.findPigs();
      return new ResponseEntity<>(pigs, HttpStatus.OK); // 성공 상태 코드와 데이터 반환
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 잘못된 요청인 경우
    }
  }

  @GetMapping("/{pigId}")
  public ResponseEntity<PigResponseDto> getPigById(@PathVariable Long pigId) {
    try {
      PigResponseDto pigResponse = pigService.findPigById(pigId);
      return ResponseEntity.ok(pigResponse);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 잘못된 요청인 경우
    }
  }

  @PostMapping("/ticket")
  public ResponseEntity<Void> createReport(
      @RequestBody TicketPurchaseRequestDto ticketPurchaseRequestDto) {
    try {

      walletService.buyTicket(ticketPurchaseRequestDto);
      return new ResponseEntity<>(HttpStatus.CREATED); // 성공 상태 코드
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 오류 상태 코드
    }
  }

  @PostMapping
  public List<PigResponseDto> getRandomPigsAndAddToWallet(
      @RequestBody PigRequestDto pigRequestDto) {
    return pigService.getRandomPigsAndAddToWallet(pigRequestDto);
  }
}
