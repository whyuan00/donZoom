package com.example.donzoom.dto.news.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NewsResponseDto {

  private String title;
  private String contents;
  private LocalDateTime createdAt;

}
