package com.example.chatservice.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="chat")
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50 )
    private Long classId;

    @Column(nullable = false, length = 50)
    private String fromId;

    @Column(nullable = false, length = 50)
    private String toId;

    @Column(nullable = false, length = 50)
    private String chatContent;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime chatDate;
}
