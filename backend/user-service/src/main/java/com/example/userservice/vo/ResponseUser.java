package com.example.userservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUser {
    private Long userId;
    private String email;
    private String tel;
    private String userName;
    private LocalDateTime createdAt;

    private String token;
}
