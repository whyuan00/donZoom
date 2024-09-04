package com.example.donzoom.dto.user.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class UserCreateDto {

  @NotNull
  @Pattern(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+[.][a-zA-Z]{2,3}$")
  private String email;

  @NotNull
  @Size(min = 1, max = 10)
  private String name;

  @NotNull
  @Size(min = 2, max = 20)
  private String nickname;

  @NotNull
  @Size(min = 9, max = 15)
  private String password; // 여기는 Hash 값이 들어가지 않음


}
