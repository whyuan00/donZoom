package com.example.donzoom.entity;

import jakarta.persistence.*;
import java.util.Collection;
import lombok.AccessLevel;
import lombok.Builder;
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
    @Column(name = "wallet_id")
    private Long id;

//    @OneToOne(mappedBy = "user")
//    private User user;

    @OneToMany(mappedBy = "wallet")
    private List<MyCollection> mycollection = new ArrayList<>();

    private Integer coin;

    private Integer ticket;

    @Builder
    public Wallet(Integer coin, Integer ticket, List<MyCollection> mycollection) {
        this.coin = coin;
        this.ticket = ticket;
        if (mycollection != null) {
            this.mycollection = mycollection;
        }
    }
}
