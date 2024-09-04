package com.example.donzoom.repository;

import com.example.donzoom.entity.Mission;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {
  Optional<Mission> findByMissionId(Long missionId);
}
