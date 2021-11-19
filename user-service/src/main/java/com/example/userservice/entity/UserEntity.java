package com.example.userservice.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="USERS")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, length = 50, unique = true)
    private String email;
    @Column(nullable = false, length = 50)
    private String userName;
    @Column(nullable = false)
    private String tel;
    @Column(nullable = false)
    private String encryptedPwd;

    private LocalDateTime createdAt;
}
