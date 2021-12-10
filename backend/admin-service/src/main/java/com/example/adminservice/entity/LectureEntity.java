package com.example.adminservice.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="lecture")
public class LectureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lectureId;
    private Long classroomId;
    private Long userId;
    private String name;
    private String userName;
    private String content;
    private String role;
    private Integer status;
    private String teacher;

}
