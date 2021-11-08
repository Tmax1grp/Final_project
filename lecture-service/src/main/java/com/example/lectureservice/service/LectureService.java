package com.example.lectureservice.service;

import com.example.lectureservice.jpa.LectureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LectureService {

    private LectureRepository lectureRepository;

    @Autowired
    public LectureService(LectureRepository lectureRepository){
        this.lectureRepository = lectureRepository;
    }

}
