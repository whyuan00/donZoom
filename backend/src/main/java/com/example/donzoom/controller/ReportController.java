package com.example.donzoom.controller;

import com.example.donzoom.dto.news.response.NewsResponseDto;
import com.example.donzoom.dto.report.response.ReportResponseDto;
import com.example.donzoom.service.NewsService;
import com.example.donzoom.service.ReportService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

  private final ReportService reportService;

  @PostMapping("/{stockId}")
  public ResponseEntity<?> addNews(@PathVariable(name = "stockId") Long stockId, @RequestBody List<ReportResponseDto> report) {
    reportService.createReport(report, stockId);
    return ResponseEntity.ok().body(report);
  }
}
