package com.example.donzoom.controller;

import com.example.donzoom.dto.user.request.LoginRequestDto;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.request.UserUpdateRequestDto;
import com.example.donzoom.dto.user.response.LoginResponseDto;
import com.example.donzoom.dto.user.response.UserInfoResponseDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.exception.DuplicateEmailException;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.service.AuthService;
import com.example.donzoom.service.RedisService;
import com.example.donzoom.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

  private final String accessTokenHeader = "Authorization";
  private final String accessTokenPrefix = "Bearer ";
  private final String refreshTokenPrefix = "refreshToken: ";
  private final UserRepository userRepository;
  private final UserService userService;
  private final RedisService redisService;
  private final AuthService authService;
  @Value("${jwt.refreshToken.expireTime}")
  private Long refreshExpired;

  @GetMapping
  public ResponseEntity<?> getCurrentUserInfo() {
    User loginUser = userService.findCurrentUser();
    UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.builder().id(loginUser.getId())
        .email(loginUser.getEmail()).name(loginUser.getName()).nickname(loginUser.getNickname())
        .isParent(loginUser.getIsParent()).profileImage(loginUser.getProfileImage()).build();
    return ResponseEntity.ok(userInfoResponseDto);
  }

  @PostMapping
  public ResponseEntity<?> register(@Valid @RequestBody UserCreateDto userCreateDto,
      BindingResult bindingResult) {

    // 입력 데이터 유효성 검증
    if (bindingResult.hasErrors()) {
      StringBuilder errors = new StringBuilder();
      bindingResult.getFieldErrors().forEach(error -> {
        errors.append(error.getDefaultMessage()).append(" ");
      });
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors.toString().trim());
    }

    try {
      // 회원가입 시도
      Long id = userService.registerUser(userCreateDto);
      return new ResponseEntity<>("회원가입 성공", HttpStatus.CREATED);
    } catch (DuplicateEmailException e) {
      return new ResponseEntity<>("이미 가입된 회원입니다", HttpStatus.CONFLICT);
    } catch (Exception e) {
      return new ResponseEntity<>("회원가입 중 오류 발생", HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto,
      HttpServletResponse response) {
    try {
      // 로그인 시도
      LoginResponseDto loginResponseDto = userService.login(loginRequestDto);

      // Access Token을 헤더에 설정
      response.setHeader(accessTokenHeader, accessTokenPrefix + loginResponseDto.getAccessToken());

      // Refresh Token을 바디에 설정
      Map<String, String> refreshToken = Map.of("refreshToken", loginResponseDto.getRefreshToken());

      // Redis에 사용자의 RefreshToken을 저장
      redisService.saveObjectWithTTL(refreshTokenPrefix + loginRequestDto.getEmail(),
          loginResponseDto.getRefreshToken(), refreshExpired);

      return ResponseEntity.ok(loginResponseDto);
    } catch (AuthenticationException e) {
      return new ResponseEntity<>("유효하지 않은 이메일과 비밀번호입니다.", HttpStatus.UNAUTHORIZED);
    } catch (Exception e) {
      log.info(e.getMessage());
      return new ResponseEntity<>("로그인 중 서버 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

    // 로그아웃
    authService.logout(request, response);

    // 응답 상태 200 OK 반환
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping("/update")
  public ResponseEntity<?> update(@RequestPart("file") MultipartFile file,
      @ModelAttribute UserUpdateRequestDto userUpdateRequestDto) {
    log.info("GET : /api/user/update");
    try {
      userService.updateUser(file, userUpdateRequestDto);
    } catch (Exception e) {
      log.error(e.getMessage());
    }
    return ResponseEntity.ok().build();
  }
}
