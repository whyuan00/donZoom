package com.example.donzoom.dto.user;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {

  private final Map<String, Object> attribute; // JSON 형식

  public KakaoResponse(final Map<String, Object> attribute) {
    this.attribute = attribute;
  }

  @Override
  public String getProvider() {
    return "kakao";
  }

  @Override
  public String getProviderId() {
    return attribute.get("id").toString();
  }

  @Override
  public String getEmail() {
    return ((Map<String, String>) attribute.get("kakao_account")).get("email");
  }

  @Override
  public String getName() {
    return attribute.get("name").toString();
  }
}
