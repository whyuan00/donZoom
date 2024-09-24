package com.example.donzoom.service;

import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.dto.user.response.UserDetailDto;
import com.example.donzoom.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

public interface AuthService {

  UserDetailDto getUserInfo(HttpServletRequest request);

  Long saveOAuth2User(UserCreateDto userCreateDto);

  String getAccessToken(HttpServletRequest request, HttpServletResponse response);

  void logout(HttpServletRequest request, HttpServletResponse response);

  void requestAccess(HttpServletRequest request, HttpServletResponse response);

  User getLoginUser(); // Added method

  Boolean isValidAccessToken(HttpServletRequest request, HttpServletResponse response);

  Map<String, String> refreshAccessToken(String refreshToken);
}
