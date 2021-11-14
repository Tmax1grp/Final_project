package com.example.referenceservice.controller;

import com.example.referenceservice.entity.ReferenceEntity;
import com.example.referenceservice.entity.ReplyEntity;
import com.example.referenceservice.jpa.ReferenceRepository;
import com.example.referenceservice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/{classId}/reference/{referenceId}")

public class ReplyController {

    @Autowired
    private ReferenceRepository referenceRepository;



    @Autowired
    private ReplyRepository replyRepository;



//댓글 조회

    //
    @GetMapping("/reply")
    public List<ReplyEntity> getReferenceEntityReply(@PathVariable Long referenceId, @PathVariable Long classId){

        ReferenceEntity referenceEntity = referenceRepository.findById(referenceId).get();

        return replyRepository.findReplyEntityByReferenceEntity(referenceEntity);
    }


//댓글 등록

    @PutMapping("/reply")
    public ReplyEntity createReply(@PathVariable Long classId, @PathVariable Long referenceId,  @RequestBody ReplyEntity replyEntity) {

        Optional<ReferenceEntity> reference = referenceRepository.findById(referenceId);
        replyEntity.setReferenceEntity(reference.get());
        replyEntity.setCreateDate(LocalDateTime.now());
        replyRepository.save(replyEntity);

        return replyEntity;


    }


    //댓글 삭제

    @DeleteMapping("/reply/{replyId}")
    public String deleteReply(@PathVariable Long classId, @PathVariable Long referenceId, @PathVariable Long replyId){
        replyRepository.deleteById(replyId);
        return "댓글이 삭제되었습니다.";
    }


}
