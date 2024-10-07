package com.example.donzoom.service;

import com.example.donzoom.dto.user.CustomUserDetails;
import com.example.donzoom.dto.user.request.LoginRequestDto;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.request.UserUpdateRequestDto;
import com.example.donzoom.dto.user.response.LoginResponseDto;
import com.example.donzoom.dto.user.response.ParentInfoResponseDto;
import com.example.donzoom.dto.user.response.UserInfoResponseDto;
import com.example.donzoom.entity.Pending;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.exception.DuplicateEmailException;
import com.example.donzoom.repository.PendingRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.repository.WalletRepository;
import com.example.donzoom.util.FileUploadUtil;
import com.example.donzoom.util.JWTUtil;
import com.example.donzoom.util.SecurityUtil;
import java.util.Optional;
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
  private final PendingRepository pendingRepository;

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
    wallet.updateUser(user);

    walletRepository.save(wallet);
    return user.getId();
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
    log.info("커스텀 디테일을 생성했습니다.");
    String email = customUserDetails.getUsername();
    String role = customUserDetails.getAuthorities().iterator().next().getAuthority();

    // Jwt토큰이 발급 전이라 이렇게 찾아와야함
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("로그인된 유저를 찾을 수 없습니다."));
    user.updateDeviceToken(loginRequestDto.getDeviceToken());
    userRepository.save(user);
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

  public User findCurrentUser() {
    String username = SecurityUtil.getAuthenticatedUsername();
    return userRepository.findByEmail(username)
        .orElseThrow(() -> new IllegalArgumentException("현재 로그인 된 유저를 찾을 수 없습니다."));
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

  public void updatePaymentPassword(String paymentPassword) {
    User user = findCurrentUser();
    user.updatePaymentPassword(paymentPassword);
    userRepository.save(user);
  }

  // 아이 등록 로직
  public String addChild(String childEmail) {
    // 현재 인증된 사용자 정보 가져오기(부모)
    String username = SecurityUtil.getAuthenticatedUsername();
    log.info(username+"eeeee");
    User parent = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Optional<Pending> pendingRecord = pendingRepository.findByChildEmail(childEmail);

    if (pendingRecord.isPresent()) {
      // 관계 설정 후, Pending 테이블에서 삭제
      setParentChildRelationship(parent, pendingRecord.get().getChildEmail());
      pendingRepository.delete(pendingRecord.get());
      return "아이와 부모 관계가 설정되었습니다.";
    } else {
      // Pending 테이블에 새로운 레코드 추가
      Pending newPending = Pending.builder()
          .childEmail(childEmail)
          .parentId(parent.getId().toString())
          .build();
      pendingRepository.save(newPending);
      return "아이 등록 요청이 대기 중입니다.";
    }
  }

  public ParentInfoResponseDto getParentInfo() {
    // 현재 인증된 사용자 정보 가져오기(아이)
    String username = SecurityUtil.getAuthenticatedUsername();
    User child = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Optional<Pending> pendingRecord = pendingRepository.findByChildEmail(child.getEmail());

    if (pendingRecord.isPresent()) {
      Long parentId = Long.parseLong(pendingRecord.get().getParentId());
      User parent = userRepository.findById(parentId)
          .orElseThrow(() -> new RuntimeException("Parent not found"));

      return ParentInfoResponseDto.builder()
          .id(parent.getId())
          .email(parent.getEmail())
          .name(parent.getName())
          .nickname(parent.getNickname())
          .profileImage(parent.getProfileImage())
          .build();
    }

    throw new RuntimeException("Pending record not found for the user.");
  }


  // 부모의 부모-아이 관계 설정 로직
  public void setParentChildRelationship(User parent, String childEmail) {
    User child = userRepository.findByEmail(childEmail).orElseThrow(() ->
        new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."));
    child.updateParent(parent);
    userRepository.save(child);
  }

  public void setParentChildRelationship2() {
    // 현재 로그인한 사용자(아이) 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    User child = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Pending 테이블에서 아이의 이메일에 해당하는 레코드 찾기
    Optional<Pending> pendingRecord = pendingRepository.findByChildEmail(child.getEmail());

    if (pendingRecord.isPresent()) {
      // 부모 ID로 부모 사용자 조회
      Long parentId = Long.parseLong(pendingRecord.get().getParentId());
      User parent = userRepository.findById(parentId)
          .orElseThrow(() -> new RuntimeException("Parent not found"));

      // 양방향 연관관계 설정
      child.updateParent(parent);
      parent.getChildren().add(child);

      // 관계 저장
      userRepository.save(child);

      // Pending 테이블에서 해당 레코드 삭제
      pendingRepository.delete(pendingRecord.get());
    } else {
      throw new RuntimeException("Pending record not found for the user.");
    }
  }
}
