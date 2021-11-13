package com.example.adminservice.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="classroom")
public class ClassroomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    @Column(nullable = false, length = 100 )
    private String name;

    @Column(nullable = false, length = 100 )
    private String imgPath;

    @Column(nullable = false, length = 20 )
    private Long userId;

    @Column(nullable = false, length = 500 )
    private String content;

    @Column(nullable = false, length = 11 )
    private Integer participantNum;

    @Column(nullable = false, length = 4 )
    private Integer status;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;
}
