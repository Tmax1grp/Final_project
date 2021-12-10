package com.example.noticeservice.controller;


import com.example.noticeservice.entity.NoticeEntity;
import com.example.noticeservice.entity.ReplyEntity;
import com.example.noticeservice.jpa.NoticeRepository;
import com.example.noticeservice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/{classId}/notice/{noticeId}")

public class ReplyController {

    @Autowired
    private NoticeRepository noticeRepository;



    @Autowired
    private ReplyRepository replyRepository;



//댓글 조회

//
@GetMapping("/reply")
public List<ReplyEntity> getNoticeEntityReply(@PathVariable Long noticeId, @PathVariable Long classId){

    NoticeEntity noticeEntity = noticeRepository.findById(noticeId).get();

    return replyRepository.findReplyEntityByNoticeEntity(noticeEntity);
}


//댓글 등록

    @PutMapping("/reply")
    public ReplyEntity createReply(@PathVariable Long classId, @PathVariable Long noticeId,  @RequestBody ReplyEntity replyEntity) {

        Optional<NoticeEntity> notice = noticeRepository.findById(noticeId);
        replyEntity.setNoticeEntity(notice.get());
        replyEntity.setCreateDate(LocalDateTime.now());
        replyRepository.save(replyEntity);

        return replyEntity;


    }


    //댓글 삭제

    @DeleteMapping("/reply/{replyId}")
    public String deleteReply(@PathVariable Long classId, @PathVariable Long noticeId, @PathVariable Long replyId){
        replyRepository.deleteById(replyId);
        return "댓글이 삭제되었습니다.";
    }


}
