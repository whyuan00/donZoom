package com.example.donzoom.service;

import com.example.donzoom.dto.news.response.NewsResponseDto;
import com.example.donzoom.entity.News;
import com.example.donzoom.entity.Stock;
import com.example.donzoom.repository.NewsRepository;
import com.example.donzoom.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

  private final NewsRepository newsRepository;
  private final StockRepository stockRepository;

  public void createNews(List<NewsResponseDto> articles,Long stockId) {
    List<News> newsList = new ArrayList<>();

    for (NewsResponseDto newsDto : articles) {
      // 주어진 stockId로 Stock 엔티티를 조회
      Stock stock = stockRepository.findById(stockId)
          .orElseThrow(() -> new RuntimeException("Stock not found for ID: " + stockId));
      // News 엔티티 생성
      News news = News.builder()
          .stock(stock)
          .title(newsDto.getTitle())
          .contents(newsDto.getContents())
          .createdAt(newsDto.getCreatedAt())
          .build();
      // 생성된 News 엔티티를 리스트에 추가
      newsList.add(news);
    }

    // News 엔티티 일괄 저장
    newsRepository.saveAll(newsList);
  }
}
