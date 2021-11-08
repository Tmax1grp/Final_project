package com.example.adminservice.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, length = 50 )
    private String email;

    @Column(nullable = false, length = 50 )
    private String password;

    @Column(nullable = false, length = 150 )
    private String name;

    @Column(nullable = false, length = 50 )
    private String tel;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;
}
