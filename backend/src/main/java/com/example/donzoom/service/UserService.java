package com.example.donzoom.service;

import com.example.donzoom.dto.user.CustomUserDetails;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.request.LoginRequestDto;
import com.example.donzoom.dto.user.response.LoginResponseDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.JWTUtil;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final PasswordService passwordService;
  private final JWTUtil jwtUtil;

  public Long registerUser(UserCreateDto userCreateDto) {

    User user = User.builder()
        .email(userCreateDto.getEmail())
        .pwdHash(passwordService.encode(userCreateDto.getPassword()))
        .name(userCreateDto.getName())
        .nickname(userCreateDto.getNickname())
        .build();

    userRepository.save(user);
    return user.getUserId();
  }

  public LoginResponseDto login(LoginRequestDto loginRequestDto) {
    log.info("로그인 요청입니다.");
    // 인증 객체 생성 및 검증
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
        loginRequestDto.getEmail(), loginRequestDto.getPassword());
    log.info("인증 객체를 생성했습니다.");
    Authentication authentication = authenticationManager.authenticate(authToken);
    log.info("인증 과정을 완료했습니다.");
    CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
    log.info("커스텀 디테일을 생성했씁니다.");
    String email = customUserDetails.getUsername();
    String role = customUserDetails.getAuthorities().iterator().next().getAuthority();

    log.info("토큰 발급 전입니다.");
    // AccessToken 발급
    String accessToken = jwtUtil.createAccessJwt(email, role);

    //RefreshToken 발급 및 저장
    String refreshToken = jwtUtil.createRefreshJwt(email, role);

    log.info("토큰 발급 후입니다.");
    return LoginResponseDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();
  }

  public User findUserById(Long userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("해당 아이디의 유저를 찾을 수 없습니다."));
  }

  public User findUserByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("해당 이메일의 유저를 찾을 수 없습니다."));
  }
}
