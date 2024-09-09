package com.example.donzoom.repository;

import com.example.donzoom.entity.News;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {

  List<News> findTop3ByStockIdOrderByCreatedAtDesc(Long stockId);

}
