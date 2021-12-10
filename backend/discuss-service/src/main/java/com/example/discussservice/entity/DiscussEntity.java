package com.example.discussservice.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="discuss")
public class DiscussEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discussId;

    @Column(nullable = false)
    private Long classId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long clickCnt;

    @Column(nullable = false)
    private String delYn;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String attach;

    @Column(nullable = false)
    private Long userId;

}
