package com.example.lectureservice.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="lecture")
public class LectureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lectureId;
    private Long ClassroomId;
    private Long userId;
    private String userName;
    private String role;
    private Integer status;
}
