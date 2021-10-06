package com.example.userservice.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
    private Long userId;
    private String password;
    private String email;
    private String userName;
    private String tel;
    private Date createdAt;

    private String decryptedPwd;
    private String encryptedPwd;
}
