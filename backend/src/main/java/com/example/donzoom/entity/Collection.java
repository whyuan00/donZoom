package com.example.donzoom.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Collection {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long collectionId;

  private String imageUrl;

  private String collectionName;

  @Builder
  public Collection(String imageUrl, String collectionName){
    this.imageUrl = imageUrl;
    this.collectionName = collectionName;
  }

}
