package com.example.donzoom.repository;

import com.example.donzoom.entity.Stock;
import com.example.donzoom.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockHistoryRepository extends JpaRepository<StockHistory, Integer> {

  // 특정 주식 ID에 대한 가장 최근 기록 조회
  StockHistory findTop1ByStockOrderByCreatedAtDesc(Stock stock);

}
