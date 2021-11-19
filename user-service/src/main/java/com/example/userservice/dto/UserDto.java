package com.example.userservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UserDto {
    private Long userId;
    private String password;
    private String email;
    private String userName;
    private String tel;
    private LocalDateTime createdAt;

    private String decryptedPwd;
    private String encryptedPwd;
}
