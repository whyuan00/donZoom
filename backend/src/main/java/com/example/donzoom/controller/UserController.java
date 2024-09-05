package com.example.donzoom.controller;

import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.request.LoginRequestDto;
import com.example.donzoom.dto.user.response.LoginResponseDto;
import com.example.donzoom.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

  private final UserService userService;


  @PostMapping
  public ResponseEntity<?> register(@RequestBody UserCreateDto userCreateDto) {
    try {
      // 회원가입 시도
      Long id = userService.registerUser(userCreateDto);
      return new ResponseEntity<>(HttpStatus.CREATED);
    }catch(Exception e){
      return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto,
      HttpServletResponse response) {
    try {
      // 로그인 시도
      LoginResponseDto loginResponseDto = userService.login(loginRequestDto);

      // Access Token을 헤더에 설정
      response.setHeader("Authorization", "Bearer " + loginResponseDto.getAccessToken());

      // Refresh Token을 쿠키에 설정
      Cookie refreshTokenCookie = createCookie("refreshToken", loginResponseDto.getRefreshToken());
      response.addCookie(refreshTokenCookie);

      return new ResponseEntity<>(HttpStatus.OK);
    }catch(AuthenticationException e){
      return new ResponseEntity<>("유효하지 않은 이메일과 비밀번호입니다.",HttpStatus.UNAUTHORIZED);
    }catch (Exception e){
      return new ResponseEntity<>("로그인 중 서버 오류가 발생했습니다.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    // 로그아웃
    Cookie refreshTokenCookie = createCookie("refreshToken", null);
    refreshTokenCookie.setMaxAge(0); // 쿠키 만료시켜서 삭제
    response.addCookie(refreshTokenCookie);

    // 응답 상태 200 OK 반환
    return new ResponseEntity<>(HttpStatus.OK);
  }

  private Cookie createCookie(String key, String value) {
    Cookie cookie = new Cookie(key, value);
    cookie.setMaxAge(60 * 60 * 60);  // 1시간
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    return cookie;
  }


}
