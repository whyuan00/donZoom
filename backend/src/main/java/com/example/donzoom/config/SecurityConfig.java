package com.example.donzoom.config;

import com.example.donzoom.Filter.JWTFilter;
import com.example.donzoom.Filter.LoginFilter;
import com.example.donzoom.service.OAuth2UserService;
import com.example.donzoom.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Collections;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${frontend.uri}")
    private String frontendUri;

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;

    private final OAuth2UserService oauth2UserService;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //
        http.cors((corsCustomizer -> corsCustomizer.configurationSource(
                new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList(frontendUri));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                })));

        // csrf 설정 ( PUT DELETE POST 막는거 끄끼 RESTFUL 어플리케이션이면 비활성화 )
        http.csrf(AbstractHttpConfigurer::disable);

        // From 로그인 방식 disable ( 기본 세팅 제거 )
        http.formLogin(AbstractHttpConfigurer::disable);

        // http basic 인증 방식 disable ( 우리가 만든 인증 방식 사용 )
        http.httpBasic(AbstractHttpConfigurer::disable);

        // 경로별 인가 작업
        http.authorizeHttpRequests((auth) -> auth
//                .requestMatchers("/register").authenticated()
                .requestMatchers("/assets/**", "/favicon.ico", "/index.html").permitAll()
                .requestMatchers("/users", "/oauth2/**", "/login/**").permitAll()
//                .anyRequest().authenticated());
                .anyRequest().permitAll());

        // 필터 추가
        http.addFilterBefore(new JWTFilter(jwtUtil),
                UsernamePasswordAuthenticationFilter.class);
//    http.addFilterAt(
//        new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil),
//        UsernamePasswordAuthenticationFilter.class);

        //세션 설정 ( JWT 를 사용해 유저 정보를 인증하기 때문에 세션은 필요 없음 )
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // OAuth2 설정
        http.oauth2Login((oauth2) -> oauth2
                .userInfoEndpoint((userInfoEndpointConfig) ->
                        userInfoEndpointConfig.userService(oauth2UserService))
                .successHandler(customOAuth2SuccessHandler));

        return http.build();
    }
}

