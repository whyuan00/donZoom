package com.example.jwtoauth2.repository;

import com.example.jwtoauth2.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  boolean existsByEmailAndDeletedAtNull(String email);

  boolean existsByUsernameAndDeletedAtNull(String nickname);

  Optional<User> findByEmailAndDeletedAtNull(String email);

  Optional<User> findUserByIdAndDeletedAtNull(Long id);

  Optional<User> findByUsernameAndDeletedAtNull(String nickname);

}