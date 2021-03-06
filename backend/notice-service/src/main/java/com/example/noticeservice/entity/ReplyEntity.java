package com.example.noticeservice.entity;


import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="notice_replies")
public class ReplyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Long replyId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String userName;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    @ManyToOne
    @JoinColumn(name = "notice_id")
    private NoticeEntity noticeEntity;



}
