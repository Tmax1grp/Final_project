package com.example.userservice.vo;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class RequestLogin {

    @NotNull(message = "Email cannot be null")
    @Size(min = 2, message = "Email not be less than two chrarcters")
    @Email
//    @Email(regexp = "/^(([^<>()].,;:\\s@\"]+(.[^<>()].,;:\\s@\"]+))|(\".+\"))@(([^<>()¥[].,;:\\s@\"]+.)+[^<>()[].,;:\\s@\"]{2,})$/i",
//            message = "이메일 형식을 확인해 주세요.")
    private String email;

    @NotNull(message ="Password cannot be null")
    @Size(min = 8, max = 20, message = "Password must be equal or grater than 8 characters and less than 16 characters")
//    @Pattern(regexp = "^.(?=.{8,20})(?=.[0-9])(?=.[a-zA-Z])(?=.[@$!%#?&]).*$", message = "비밀번호에 숫자, 영문자, 특수문자를 포함하세요.")
    private String password;
}
