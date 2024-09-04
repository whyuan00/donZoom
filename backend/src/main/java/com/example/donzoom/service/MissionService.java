package com.example.donzoom.service;

import com.example.donzoom.repository.MissionRepository;
import com.example.donzoom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MissionService {
  private final MissionRepository missionRepository;
  private final UserRepository userRepository;


}
