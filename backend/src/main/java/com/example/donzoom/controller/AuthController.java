package com.example.donzoom.controller;

import com.example.donzoom.dto.user.request.TokenRequestDto;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.response.UserDetailDto;
import com.example.donzoom.service.AuthService;
import com.example.donzoom.service.RedisService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  @GetMapping("/userInfo")
  public ResponseEntity<?> getUserInfo(HttpServletRequest request, HttpServletResponse response) {
    UserDetailDto userDetailDto = authService.getUserInfo(request);
    if (userDetailDto != null) {
      return new ResponseEntity<>(userDetailDto, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

  @PostMapping("/users")
  public ResponseEntity<?> register(@RequestBody UserCreateDto userCreateDto) {
    Long saveId = authService.saveOAuth2User(userCreateDto);
    return new ResponseEntity<>(saveId, HttpStatus.OK);
  }

  @PostMapping("/refresh")
  public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response, @RequestBody
      TokenRequestDto tokenRequestDto) {
    // 클라이언트가 바디로 보내준 Refresh Token을 추출
    String refreshToken = tokenRequestDto.getRefreshToken();

    if (refreshToken == null) {
      return new ResponseEntity<>("Refresh token이 없습니다.", HttpStatus.UNAUTHORIZED);
    }

    // Redis에서 Refresh Token 검증 및 Access Token 발급 처리
    Map<String, String> tokens = authService.refreshAccessToken(refreshToken);

    if (tokens.get("refreshToken") == null) {
      return new ResponseEntity<>("Invalid or expired refresh token. 재로그인 필요.", HttpStatus.UNAUTHORIZED);
    }

    // Access Token과 Refresh Token을 함께 응답
    String newAccessToken = tokens.get("accessToken");
    String newRefreshToken = tokens.get("refreshToken");

    // 응답 헤더에 새로운 Access Token을 추가
    response.setHeader("Authorization", "Bearer " + newAccessToken);

    // 응답 바디에 새로운 Refresh Token을 반환
    return ResponseEntity.ok().body(Map.of("refreshToken", newRefreshToken));
  }


  @GetMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    authService.logout(request, response);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/token")
  public ResponseEntity<?> requestAccess(HttpServletRequest request, HttpServletResponse response) {
    authService.requestAccess(request, response);
    return new ResponseEntity<>(HttpStatus.OK);
  }


}