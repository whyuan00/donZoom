package com.example.jwtoauth2.controller;

import com.example.jwtoauth2.dto.user.request.UserCreateDto;
import com.example.jwtoauth2.dto.user.response.UserDetailDto;
import com.example.jwtoauth2.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

  @GetMapping("/refresh")
  public ResponseEntity<?> getAccessToken(HttpServletRequest request,
      HttpServletResponse response) {
    String accessToken = authService.getAccessToken(request, response);
    if (accessToken != null) {
      response.addHeader("Authorization", "Bearer " + accessToken);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    return new ResponseEntity<>("Refresh token이 없습니다.", HttpStatus.UNAUTHORIZED);
  }

  @GetMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    authService.logout(request, response);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/token")
  public ResponseEntity<?> requestAccess(HttpServletRequest request,
      HttpServletResponse response) {
    authService.requestAccess(request, response);
    return new ResponseEntity<>(HttpStatus.OK);
  }


}