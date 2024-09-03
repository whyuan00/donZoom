package com.example.jwtoauth2.entity;

import jakarta.persistence.*;
import java.util.Collection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;

//    @OneToOne(mappedBy = "user")
//    private User user;

    @OneToMany(mappedBy = "wallet")
    private List<MyCollection> mycollection = new ArrayList<>();

    private Integer coin;

    private Integer ticket;
}
