package com.example.donzoom.service;

import com.example.donzoom.dto.stock.response.StockDetailResponseDto;
import com.example.donzoom.dto.stock.response.StockSimpleResponseDto;
import com.example.donzoom.entity.Stock;
import com.example.donzoom.entity.StockHistory;
import com.example.donzoom.repository.StockHistoryRepository;
import com.example.donzoom.repository.StockRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

  private final StockHistoryRepository stockHistoryRepository;
  private final StockRepository stockRepository;

  public StockSimpleResponseDto getAllStocks() {
    List<Long> stockIds = stockRepository.findAll().stream().map(Stock::getId).toList();

    List<StockHistory> recentPrices = stockIds.stream()
        .map(stockHistoryRepository::findTop1ByStockIdOrderByCreatedAtDesc)
        .toList();

    List<StockDetailResponseDto> stockDtos = recentPrices.stream()
        .map(stockHistory -> StockDetailResponseDto.builder()
            .stockId(stockHistory.getStock().getId())
            .stockName(stockHistory.getStock().getStockName())
            .stockPrice(stockHistory.getPrice())
            .lastCreatedAt(stockHistory.getCreatedAt())
            .build()).toList();

    return StockSimpleResponseDto.builder().stocks(stockDtos).build();
  }

}
