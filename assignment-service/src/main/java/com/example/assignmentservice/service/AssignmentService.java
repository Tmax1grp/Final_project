package com.example.assignmentservice.service;

import com.example.assignmentservice.jpa.AssignmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AssignmentService {
    private AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository){
        this.assignmentRepository = assignmentRepository;
    }
}