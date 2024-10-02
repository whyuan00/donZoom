package com.example.donzoom.service;

import com.example.donzoom.dto.user.CustomUserDetails;
import com.example.donzoom.dto.user.request.LoginRequestDto;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.request.UserUpdateRequestDto;
import com.example.donzoom.dto.user.response.LoginResponseDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.exception.DuplicateEmailException;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.repository.WalletRepository;
import com.example.donzoom.util.FileUploadUtil;
import com.example.donzoom.util.JWTUtil;
import com.example.donzoom.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

  private final AuthenticationManager authenticationManager;
  private final PasswordService passwordService;
  private final UserRepository userRepository;
  private final WalletRepository walletRepository;
  private final JWTUtil jwtUtil;
  private final FileUploadUtil fileUploadUtil;

  public Long registerUser(UserCreateDto userCreateDto) {

    //이메일 중복체크
    if (userRepository.existsByEmail(userCreateDto.getEmail())) {
      throw new DuplicateEmailException("이미 사용 중인 이메일입니다.");
    }

    // 새로운 지갑 생성
    Wallet wallet = Wallet.builder().build();
    walletRepository.save(wallet);

    User user = User.builder().email(userCreateDto.getEmail())
        .pwdHash(passwordService.encode(userCreateDto.getPassword())).name(userCreateDto.getName())
        .nickname(userCreateDto.getNickname()).wallet(wallet).build();

    userRepository.save(user);
    return user.getId();
  }

  public LoginResponseDto login(LoginRequestDto loginRequestDto) {log.info("로그인 요청입니다.");
    // 인증 객체 생성 및 검증
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
        loginRequestDto.getEmail(), loginRequestDto.getPassword());
    log.info("인증 객체를 생성했습니다.");
    Authentication authentication = authenticationManager.authenticate(authToken);
    log.info("인증 과정을 완료했습니다.");
    CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
    log.info("커스텀 디테일을 생성했습니다.");
    String email = customUserDetails.getUsername();
    String role = customUserDetails.getAuthorities().iterator().next().getAuthority();

    User user = findCurrentUser();
    user.updateDeviceToken(loginRequestDto.getDeviceToken());

    log.info("토큰 발급 전입니다.");
    // AccessToken 발급
    String accessToken = jwtUtil.createAccessJwt(email, role);

    //RefreshToken 발급 및 저장
    String refreshToken = jwtUtil.createRefreshJwt(email, role);
    log.info("토큰 발급 후입니다.");
    return LoginResponseDto.builder().accessToken(accessToken).refreshToken(refreshToken)
        .name(user.getName()).build();
  }

  public void updateUser(MultipartFile file, UserUpdateRequestDto userUpdateRequestDto)
      throws Exception {
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    // 파일을 로컬/서버에 저장
    String fileUri = fileUploadUtil.saveFile(file);

    // 프로필 이미지 경로를 DB에 업데이트
    user.updateAdditionalInfo(userUpdateRequestDto.getName(), userUpdateRequestDto.getNickname(),
        fileUri, userUpdateRequestDto.getIsParent());
    userRepository.save(user);
  }

  public User findCurrentUser(){
    String username = SecurityUtil.getAuthenticatedUsername();
    return userRepository.findByEmail(username).orElseThrow(()->new IllegalArgumentException("현재 로그인 된 유저를 찾을 수 없습니다."));
  }

  public User findUserById(Long userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("해당 아이디의 유저를 찾을 수 없습니다."));
  }

  public User findUserByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("해당 이메일의 유저를 찾을 수 없습니다."));
  }

  public User findUserByAccountNo(String accountNo) {
    return userRepository.findByAccountNo(accountNo)
        .orElseThrow(() -> new IllegalArgumentException("해당 계좌번호의 유저를 찾을 수 없습니다."));
  }

  public void updatePaymentPassword(String paymentPassword){
    User user = findCurrentUser();
    user.updatePaymentPassword(paymentPassword);
  }
}
