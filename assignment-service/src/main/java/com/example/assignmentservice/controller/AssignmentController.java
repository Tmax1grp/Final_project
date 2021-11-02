package com.example.assignmentservice.controller;


import com.example.assignmentservice.entity.AssignmentEntity;
import com.example.assignmentservice.jpa.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")
public class AssignmentController {


    @Autowired
    private AssignmentRepository assignmentRepository;




    @GetMapping("/assignment/findall")
    @ResponseBody
    public List<AssignmentEntity> allSearchAssignment(){

        return assignmentRepository.findAll();
    }




    @GetMapping("/assignment/{assignment-id}")
    @ResponseBody
    public List<AssignmentEntity> searchAssignment(@PathVariable String noticeId ,@RequestBody AssignmentEntity assignmentEntity){
        final List<AssignmentEntity> assignmentList =
                assignmentRepository.findAssignmentEntityByAssignmentId(
                        assignmentEntity.getAssignmentId()
                );
        return assignmentList;
    }




    @PostMapping("/assignment")
    public void createAssignment(@RequestBody AssignmentEntity assignmentEntity){
        AssignmentEntity assignment = new AssignmentEntity();
        assignment.setClassId(assignmentEntity.getClassId());
        assignment.setTitle(assignmentEntity.getTitle());
        assignment.setClickCnt(assignmentEntity.getClickCnt());
        assignment.setDelYn(assignmentEntity.getDelYn());
        assignment.setContent(assignmentEntity.getContent());
        assignment.setAuthor(assignmentEntity.getAuthor());
        assignment.setAttach(assignmentEntity.getAttach());
        assignment.setCreatedDate(LocalDateTime.now());

        assignmentRepository.save(assignment);
    }

    @DeleteMapping("/assignment")
    public void deleteAssignment(@RequestBody AssignmentEntity assignmentEntity){
        assignmentRepository.deleteById(assignmentEntity.getClassId());
    }


}
