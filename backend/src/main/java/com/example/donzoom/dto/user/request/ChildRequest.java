package com.example.donzoom.dto.user.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class ChildRequest {
  private String childEmail;
  @JsonCreator
  public ChildRequest(@JsonProperty("childEmail") String childEmail) {
    this.childEmail = childEmail;

  }
}