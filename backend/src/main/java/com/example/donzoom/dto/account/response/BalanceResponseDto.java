package com.example.donzoom.dto.account.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BalanceResponseDto {
  private HeaderDto Header;
  private List<BalanceRecDto> REC;
}
