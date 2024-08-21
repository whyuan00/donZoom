package com.example.jwtoauth2.service;

import com.example.jwtoauth2.dto.user.request.UserCreateDto;
import com.example.jwtoauth2.dto.user.response.UserDetailDto;
import com.example.jwtoauth2.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

  UserDetailDto getUserInfo(HttpServletRequest request);

  Long saveOAuth2User(UserCreateDto userCreateDto);

  String getAccessToken(HttpServletRequest request, HttpServletResponse response);

  void logout(HttpServletRequest request, HttpServletResponse response);

  void requestAccess(HttpServletRequest request, HttpServletResponse response);

  User getLoginUser(); // Added method
}
