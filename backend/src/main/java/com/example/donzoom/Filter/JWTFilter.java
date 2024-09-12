package com.example.donzoom.Filter;

import com.example.donzoom.dto.user.CustomUserDetails;
import com.example.donzoom.entity.User;
import com.example.donzoom.util.JWTUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    private static final List<String> EXCLUDE_PATHS = Arrays.asList(

            "/users/check-email",
            "/auth/login", "/auth/logout", "/auth/token", "/auth/refresh",
            "/login",
            "/user", "/api/user", "/user/login", "/api/user/login",
            "login/oauth2/code/kakao", "/api/login/oauth2/code/kakao", "/login/oauth2/code/kakao",
            "login/oauth2/code/naver", "/api/login/oauth2/code/naver", "/login/oauth2/code/naver",
            "login/oauth2/code/google", "/api/login/oauth2/code/google", "/login/oauth2/code/google",
            "/app/**", "/archive-websocket/**"
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        if (path.matches("^/stock/\\d+$")) {
            return true;  // 이 경로는 JWT 검사를 제외
        }
        return EXCLUDE_PATHS.contains(path);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

//        log.info("----- JWT 필터에 검증요청이 왔습니다. -----");
        log.info("요청 URL: {}", request.getRequestURL());
//        log.info("Servlet 경로: {}", request.getServletPath());

        String authorization = request.getHeader("Authorization");
//        log.info("헤더에서 찾은 Authorization 정보입니다. = {}", authorization);

        try {
            if (authorization != null && authorization.startsWith("Bearer ")) {
                log.info("Access 토큰 인증을 시작합니다.");
                if (!handleAccessToken(authorization, request, response)) {
                    return; // 토큰 처리 중 오류 발생 시 필터 체인 중단
                }
            } else {
                log.info("유효한 Authorization 헤더가 없습니다.");
            }
            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            log.error("JWT validation error가 발생했습니다.", e);
        } catch (Exception e) {
            log.error("JWT 필터 처리 중 예외 발생", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Internal Server Error");
        }
    }

    private boolean handleAccessToken(String authorization, HttpServletRequest request,
                                      HttpServletResponse response) throws IOException {
        String token = authorization.split(" ")[1];

        try {
            if (jwtUtil.isExpired(token)) {
                log.info("만료된 JWT 토큰입니다.");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("AccessTokenExpired");
                return false; // 필터 체인 중단
            }
            log.info("유효한 JWT 토큰입니다.");

            // 유저 정보 저장하기
            setAuthenticationToContext(token);
            return true; // 필터 체인 계속 진행

        } catch (Exception e) {
            log.error("JWT 토큰 처리 중 예외 발생", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid JWT Token");
            return false; // 필터 체인 중단
        }
    }

    private void setAuthenticationToContext(String token) {
        String email = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        User user = User.builder()
                .email(email)
                .role(role)
                .build();

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,
                customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}