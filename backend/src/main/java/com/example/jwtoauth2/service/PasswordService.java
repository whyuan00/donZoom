package com.example.jwtoauth2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public String encode(String password) {
        return bCryptPasswordEncoder.encode(password);
    }
}