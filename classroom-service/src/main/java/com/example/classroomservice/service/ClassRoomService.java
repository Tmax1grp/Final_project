package com.example.classroomservice.service;

import com.example.classroomservice.jpa.ClassroomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ClassRoomService {

    private ClassroomRepository classRoomRepository;

    @Autowired
    public ClassRoomService(ClassroomRepository classRoomRepository){
        this.classRoomRepository = classRoomRepository;
    }
}
