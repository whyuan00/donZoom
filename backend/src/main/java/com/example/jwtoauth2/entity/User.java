package com.example.jwtoauth2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // lombok, getter setter toString equals hashcode 등을 자동 생성
@NoArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // PK 자동 생성(생성 전략 = 데이터베이스에 의존)
  private Long id;

  @Column(columnDefinition = "VARCHAR(320)", unique = true)
  private String email;

  @Column(nullable = false,unique = true)
  private String username;

  @Column(nullable = false)
  private String pwdHash;

  private String role;
  private String provider;

  private LocalDateTime deletedAt;

  @Builder
  public User(String email, String pwdHash, String username, String role, String provider) {
    this.email = email;
    this.pwdHash = pwdHash;
    this.username = username;
    this.role = role;
    this.provider = provider;
  }

  //=== OAuth2 관련 ===///
  public void OAuth2Update(User TempOAuthUser) {
    this.role = TempOAuthUser.getRole();
    this.username = TempOAuthUser.getUsername();
    this.pwdHash = TempOAuthUser.getPwdHash();
  }
}
