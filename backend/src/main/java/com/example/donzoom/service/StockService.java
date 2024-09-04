package com.example.donzoom.service;

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

  public List<StockSimpleResponseDto> getAllStocks() {
    List<Stock> stocks = stockRepository.findAll();

    List<StockHistory> stockHistories = stocks.stream()
        .map(stockHistoryRepository::findTop1ByStockOrderByCreatedAtDesc)
        .toList();

    List<StockSimpleResponseDto> stockDtos = stockHistories.stream()
        .map(stockHistory -> StockSimpleResponseDto.builder()
            .stockName(stockHistory.getStock().getStockName())
            .stockPrice(stockHistory.getPrice())
            .lastCreatedAt(stockHistory.getCreatedAt())
            .build()).toList();

    return stockDtos;
  }

}
