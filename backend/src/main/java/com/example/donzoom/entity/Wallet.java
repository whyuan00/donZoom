package com.example.donzoom.entity;

import jakarta.persistence.*;
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
    private Long walletId;

//    @OneToOne(mappedBy = "user")
//    private User user;

    @OneToMany(mappedBy = "wallet")
    private List<MyPig> mypigs = new ArrayList<>();

    private Integer coin;

    private Integer ticket;

    @Builder
    public Wallet(Integer coin, Integer ticket, List<MyPig> mypigs) {
        this.coin = coin;
        this.ticket = ticket;
        if (mypigs != null) {
            this.mypigs = mypigs;
        }
    }

    public void setCoin(Integer coin) {
        this.coin = coin;
    }

    public void setTicket(Integer ticket) {
        this.ticket = ticket;
    }
}
