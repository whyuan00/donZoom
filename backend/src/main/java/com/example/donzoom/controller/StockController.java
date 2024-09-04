package com.example.donzoom.controller;

import com.example.donzoom.dto.stock.response.StockSimpleResponseDto;
import com.example.donzoom.service.StockService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stock") // TODO: Base URL 생기면 교체 예정
public class StockController {

  private final StockService stockService;

  @GetMapping
  public ResponseEntity<StockSimpleResponseDto> getAllStocks() {
    StockSimpleResponseDto allStocks = stockService.getAllStocks();
    return ResponseEntity.ok().body(allStocks);
  }

}
