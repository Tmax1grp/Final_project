package com.example.adminservice.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String email;
    private String password;
    private String name;
    private String tel;
}
