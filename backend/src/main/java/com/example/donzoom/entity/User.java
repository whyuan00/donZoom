package com.example.donzoom.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // PK 자동 생성(생성 전략 = 데이터베이스에 의존)
  @Column(name = "user_id")
  private Long id;

  @NotBlank(message = "이메일은 필수 입력 사항입니다.")
  @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = "유효한 이메일 형식을 입력하세요.")
  @Column(nullable = false, unique = true)
  private String email;

  private String pwdHash;

  private String name;

  private String nickname;

  private String userKey;
  private String role;
  private String provider;

  @ManyToOne(fetch = FetchType.LAZY)
  private User parent;

  @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<User> children;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "WALLET_ID")
  private Wallet wallet;

  private Long dailyLimit;             // 1일 결제 한도
  private Long perTransactionLimit;    // 1회 결제 한도
  private Long dailyUsageAmount;  //1일 사용금액

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "user_id") // 단방향 관계로 JoinColumn 설정
  private List<AutoTransfer> autoTransfers;

  @Builder
  public User(User parent, String email, String pwdHash, String name, String nickname,
      String userKey, String role, String provider, Wallet wallet,
      List<AutoTransfer> autoTransfers) {
    this.parent = parent;
    this.email = email;
    this.pwdHash = pwdHash;
    this.name = name;
    this.nickname = nickname;
    this.userKey = userKey;
    this.role = role;
    this.provider = provider;
    this.wallet = wallet;
    this.dailyLimit = 0L;
    this.perTransactionLimit = 0L;
    if (autoTransfers != null) {
      this.autoTransfers = autoTransfers;
    }
    this.dailyUsageAmount = 0L;
  }


  //=== OAuth2 관련 ===///
  public void oauth2Update(User tempOAuthUser) {
    this.role = tempOAuthUser.getRole();
    this.name = tempOAuthUser.getName();
    this.pwdHash = tempOAuthUser.getPwdHash();
  }

  public void updateUserKey(String userKey) {
    this.userKey = userKey;
  }


  // 1일결제한도 변경
  public void updateDailyLimit(Long newLimit) {
    this.dailyLimit = newLimit;
  }

  // 1회결제한도 변경
  public void updatePerTransactionLimit(Long newLimit) {
    this.perTransactionLimit = newLimit;
  }

  // 1일결제금액 변경
  public void updateDailyUsageAmount(Long dailyUsageAmount) {
    this.dailyUsageAmount = dailyUsageAmount;
  }

}
