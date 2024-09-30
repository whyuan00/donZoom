package com.example.donzoom.dto.user.response;

import com.example.donzoom.entity.AutoTransfer;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfoResponseDto {
  private Long id;
  private String email;
  private String name;
  private String nickname;
  private String profileImage;
  private Boolean isParent;

  private User parent;
  private List<User> children;

  private Wallet wallet;
  private Long dailyLimit;             // 1일 결제 한도
  private Long perTransactionLimit;    // 1회 결제 한도
  private Long dailyUsageAmount;  //1일 사용금액

  private List<AutoTransfer> autoTransfers;

  private String accountNo;
}
