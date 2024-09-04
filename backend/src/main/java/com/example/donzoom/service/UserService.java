package com.example.donzoom.service;

import com.example.donzoom.dto.user.request.UserCreateDto;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordService passwordService;

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

  public User findUserById(Long userId) {
    return userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("해당 아이디의 유저를 찾을 수 없습니다."));
  }

  public User findUserByEmail(String email) {
    return userRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("해당 이메일의 유저를 찾을 수 없습니다."));
  }
}
