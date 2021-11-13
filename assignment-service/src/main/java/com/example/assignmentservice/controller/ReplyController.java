package com.example.assignmentservice.controller;

import com.example.assignmentservice.entity.AssignmentEntity;
import com.example.assignmentservice.entity.ReplyEntity;
import com.example.assignmentservice.jpa.AssignmentRepository;
import com.example.assignmentservice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/{classId}/assignment/{assignmentId}")

public class ReplyController {

    @Autowired
    private AssignmentRepository assignmentRepository;



    @Autowired
    private ReplyRepository replyRepository;



//댓글 조회

    //
    @GetMapping("/reply")
    public List<ReplyEntity> getAssignmentEntityReply(@PathVariable Long assignmentId, @PathVariable Long classId){

        AssignmentEntity assignmentEntity = assignmentRepository.findById(assignmentId).get();

        return replyRepository.findAll();
    }


//댓글 등록

    @PutMapping("/reply")
    public ReplyEntity createReply(@PathVariable Long classId, @PathVariable Long assignmentId,  @RequestBody ReplyEntity replyEntity) {

        Optional<AssignmentEntity> assignment = assignmentRepository.findById(assignmentId);
        replyEntity.setAssignmentEntity(assignment.get());
        replyEntity.setCreateDate(LocalDateTime.now());
        replyRepository.save(replyEntity);

        return replyEntity;


    }


    //댓글 삭제

    @DeleteMapping("/reply/{replyId}")
    public String deleteReply(@PathVariable Long classId, @PathVariable Long assignmentId, @PathVariable Long replyId){
        replyRepository.deleteById(replyId);
        return "댓글이 삭제되었습니다.";
    }


}
