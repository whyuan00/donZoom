package com.example.donzoom.controller;

import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


  @PostMapping("/")
  public ResponseEntity<?> register(@RequestBody UserCreateDto userCreateDto) {
    // 회원가입
    Long id = userService.registerUser(userCreateDto);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User user) {
    // 로그인
    //userService.login(user);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/logout")
  public ResponseEntity<?> logout() {
    // 로그아웃
    return new ResponseEntity<>(HttpStatus.OK);
  }


}
