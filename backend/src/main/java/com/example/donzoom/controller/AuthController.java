package com.example.donzoom.controller;

import com.example.donzoom.dto.user.request.TokenRequestDto;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.response.UserDetailDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.service.AuthService;
import com.example.donzoom.service.RedisService;
import com.example.donzoom.util.JWTUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
  private final UserRepository userRepository;
  private final JWTUtil jwtUtil;

  @Value("${google.client.id}")
  private String googleClintId;

  @PostMapping("/google")
  public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> payload) {
    log.info("구글 로그인 시도");
    log.info(payload.toString());
    String idTokenString = payload.get("idToken");

    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
        .setAudience(Collections.singletonList(googleClintId)) // 웹 클라이언트 ID 사용
        .build();
    log.info("google verifier 생성");

    try {
      log.info(idTokenString);
      GoogleIdToken idToken = verifier.verify(idTokenString);
      if (idToken != null) {
        log.info(idToken.toString());
        Payload tokenPayload = idToken.getPayload();

        // 사용자 정보 추출
        String userId = tokenPayload.getSubject();
        String email = tokenPayload.getEmail();
        String name = (String) tokenPayload.get("name");

        log.info("email"+email);

        // 데이터베이스에서 사용자 존재 여부 확인
        Optional<User> optionalUser = userRepository.findByEmail(email);

        User user;
        if (optionalUser.isPresent()) {
          // 사용자 존재 - 로그인 처리
          user = optionalUser.get();
        } else {
          // 사용자 미존재 - 회원가입 처리
          log.info("회원가입 처리");
          user = User.builder()
              .email(email)
              .name(name)
              .build();
          userRepository.save(user);
        }

        log.info("JWT 토큰 발급");
        // 로그인 성공 처리 (예: JWT 토큰 발급)
        String accessToken = jwtUtil.createAccessJwt(user.getEmail(), user.getRole());
        String refreshToken = jwtUtil.createRefreshJwt(user.getEmail(), user.getRole());

        return new ResponseEntity<>(HttpStatus.OK);
      } else {
        log.info("INVALID ID TOKEN");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid ID token");
      }
    } catch (Exception e) {
      log.info(e.getMessage());
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Token verification failed");
    }
  }

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