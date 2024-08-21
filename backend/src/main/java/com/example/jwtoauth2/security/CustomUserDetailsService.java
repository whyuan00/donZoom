package com.example.jwtoauth2.security;

import com.example.jwtoauth2.entity.User;
import com.example.jwtoauth2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService {

//  @Autowired
//  private UserRepository userRepository;
//
//  @Override
//  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    User user = userRepository.findByUsername(username)
//        .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//
//    return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
//        .password(user.getPassword())
//        .authorities(user.getRoles().toArray(new String[0]))
//        .accountExpired(false)
//        .accountLocked(false)
//        .credentialsExpired(false)
//        .disabled(false)
//        .build();
//  }
}

