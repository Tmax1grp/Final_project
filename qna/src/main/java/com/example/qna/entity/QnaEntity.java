package com.example.qna.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(name="Qna")
public class QnaEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long disscuss_id;

    @Column(nullable=true)
    private Long class_id;

    @Column(nullable=true)
    private String title;

    @Column(nullable=true)
    private String content;

    @Column(nullable=true)
    private String author;

    @Column(nullable = false, insertable = false, updatable = false)
    @ColumnDefault(value="CURRENT_TIMESTAMP")
    private LocalDate created_date;

    @Column(nullable=true)
    private String attach;



}
