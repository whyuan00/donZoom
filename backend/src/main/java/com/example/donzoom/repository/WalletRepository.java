package com.example.donzoom.repository;

import com.example.donzoom.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {

  public Wallet findByUserId(Long userId);

}
