package com.example.assignmentservice.entity;


import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="assignment")
public class AssignmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    @Column(nullable = false)
    private Long classId;

    @Column(nullable = false, length = 100)
    private String title;


    @Column(nullable = false)
    private String author;


    @Column(nullable = false)
    private Long clickCnt;

    @Column(nullable = false)
    private Long delYn;


    @Column(nullable = false, length = 500)
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;

    @Column(nullable = false, length = 100)
    private String attach;
}
