package com.example.donzoom.dto.mission.request;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionCreateDto {
  private final String contents;
  private final LocalDateTime  dueDate;
  private final Long reward;

}
