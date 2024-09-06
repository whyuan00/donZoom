package com.example.donzoom.repository;

import com.example.donzoom.entity.StockWallet;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface StockWalletRepository extends CrudRepository<StockWallet, Long> {

  List<StockWallet> findByWalletId(Long walletId);

}
