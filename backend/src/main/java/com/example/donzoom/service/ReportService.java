package com.example.donzoom.service;

import com.example.donzoom.dto.news.response.NewsResponseDto;
import com.example.donzoom.dto.report.response.ReportResponseDto;
import com.example.donzoom.entity.News;
import com.example.donzoom.entity.Report;
import com.example.donzoom.entity.Stock;
import com.example.donzoom.repository.NewsRepository;
import com.example.donzoom.repository.ReportRepository;
import com.example.donzoom.repository.StockRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

  private final ReportRepository reportRepository;
  private final StockRepository stockRepository;

  public void createReport(List<ReportResponseDto> reports,Long stockId) {
    List<Report> newsList = new ArrayList<>();

    for (ReportResponseDto reportDto : reports) {
      // 주어진 stockId로 Stock 엔티티를 조회
      Stock stock = stockRepository.findById(stockId)
          .orElseThrow(() -> new RuntimeException("Stock not found for ID: " + stockId));
      // News 엔티티 생성
      Report report = Report.builder()
          .stock(stock)
          .title(reportDto.getTitle())
          .contents(reportDto.getContents())
          .createdAt(reportDto.getCreatedAt())
          .build();
      // 생성된 News 엔티티를 리스트에 추가
      newsList.add(report);
    }

    // News 엔티티 일괄 저장
    reportRepository.saveAll(newsList);
  }

}
