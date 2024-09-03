package com.example.donzoom.service;

import com.example.donzoom.constant.LoginMessage;
import com.example.donzoom.dto.user.CustomUserDetails;
import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.response.UserDetailDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

  private final JWTUtil jwtUtil;
  private final UserRepository userRepository;
   private final OAuth2UserService oAuth2UserService;

  @Override
  public UserDetailDto getUserInfo(HttpServletRequest request) {
    User loginUser = getLoginUser();
    if (loginUser == null) {
      return null;
    }

    UserDetailDto userDetailDto = UserDetailDto.builder()
        .id(loginUser.getId())
        .role(loginUser.getRole())
        .username(loginUser.getUsername())
        .email(loginUser.getEmail())
        .build();

    return userDetailDto;
  }

  @Override
  public Long saveOAuth2User(UserCreateDto userCreateDto) {
    return oAuth2UserService.saveOAuth2User(userCreateDto);
  }

  @Override
  public String getAccessToken(HttpServletRequest request, HttpServletResponse response) {
    String refreshToken = extractRefreshTokenFromCookie(request);

    if (refreshToken == null || jwtUtil.isExpired(refreshToken)) {
      return null;
    }


    String email = jwtUtil.getUsername(refreshToken);
    String role = jwtUtil.getRole(refreshToken);
    log.info("email: {}, role: {}에 해당하는 accessToken을 재발급합니다. ", email, role);
    return jwtUtil.createAccessJwt(email, role);
  }

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response) {
    String refreshToken = extractRefreshTokenFromCookie(request);
    if (refreshToken == null) {
      log.info("refreshToken을 쿠키에서 찾을 수 없습니다.");
      return;
    }

    String email = jwtUtil.getUsername(refreshToken);
    User user = userRepository.findByEmailAndDeletedAtNull(email)
        .orElseThrow(() -> new IllegalArgumentException("해당하는 이메일의 유저가 없습니다"));
    String userId = user.getId().toString();

    // refreshToken 쿠키 제거
    Cookie cookie = new Cookie("refreshToken", null);
    cookie.setMaxAge(0);
    cookie.setPath("/");
    response.addCookie(cookie);

  }

  @Override
  public void requestAccess(HttpServletRequest request, HttpServletResponse response) {
    String authorization = extractOAuthAuthorizationFromCookie(request);
    if (authorization == null || jwtUtil.isExpired(authorization)) {
      log.info("토큰이 없습니다. 혹은 만료되었습니다");
      return;
    }

    String email = jwtUtil.getUsername(authorization);
    String role = jwtUtil.getRole(authorization);

    String accessToken = jwtUtil.createAccessJwt(email, role);
    response.addHeader("Authorization", "Bearer " + accessToken);

    String refreshToken = jwtUtil.createRefreshJwt(email, role);
    response.addCookie(createCookie("refreshToken", refreshToken));

    User user = userRepository.findByEmailAndDeletedAtNull(email)
        .orElseThrow(() -> new IllegalArgumentException("해당하는 이메일의 유저가 없습니다"));

    // OAuthAuthorization 쿠키 제거
    removeOAuthAuthorizationCookie(response);
  }

  @Override
  public User getLoginUser() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (!isLogin(principal)) {
      return null;
    }
    String email = ((CustomUserDetails) principal).getUsername();
    return userRepository.findByEmailAndDeletedAtNull(email)
        .orElseThrow(() -> new IllegalArgumentException(
            LoginMessage.WRONG_LOGIN_REQUEST.getValue()));
  }

  private boolean isLogin(Object principal) {
    return principal instanceof CustomUserDetails;
  }

  private String extractRefreshTokenFromCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("refreshToken")) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }

  private String extractOAuthAuthorizationFromCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if ("OAuthAuthorization".equals(cookie.getName())) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }

  private void removeOAuthAuthorizationCookie(HttpServletResponse response) {
    Cookie cookie = new Cookie("OAuthAuthorization", null);
    cookie.setMaxAge(0);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    response.addCookie(cookie);
  }

  private Cookie createCookie(String key, String value) {
    Cookie cookie = new Cookie(key, value);
    cookie.setMaxAge(60 * 60 * 60);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    return cookie;
  }

}