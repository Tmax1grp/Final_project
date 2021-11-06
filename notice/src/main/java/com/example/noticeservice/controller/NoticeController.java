package com.example.noticeservice.controller;


import com.example.noticeservice.entity.NoticeEntity;
import com.example.noticeservice.jpa.NoticeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/{classId}")

public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;





// 전체조회
    @GetMapping("/notice/all")
    public List<NoticeEntity> allSearchNotice(){
        return noticeRepository.findAll();
    }


    // 조회수 , 상세조회
    @GetMapping("/notice/{noticeId}")
    public NoticeEntity searchNotice(@PathVariable Long noticeId,
                                     @RequestParam(value = "clickCnt", required = false) Integer clickCnt ){

        NoticeEntity notice = noticeRepository.findByNoticeId(noticeId); //    NoticeEntity findByNoticeId(Long noticeId); <- 원형

        int count = 0;
        if(clickCnt == null){
            count = 0;
        }
        else{
            count = 1;
        }
        notice.setClickCnt(notice.getClickCnt()+count);
        noticeRepository.save(notice);
        return notice;
    }


// 검색
    @PutMapping("/notice/search")
    public List<NoticeEntity> allSearchNotice(@PathVariable Long classId,
                                              @RequestBody NoticeEntity noticeEntity
    ){


        if(noticeEntity.getTitle().length() > 0){
            return noticeRepository.findByClassIdAndTitle(classId, noticeEntity.getTitle());
        }
        else if(noticeEntity.getAuthor().length() > 0){
            return noticeRepository.findByClassIdAndAuthor(classId, noticeEntity.getAuthor());
        }
        else{
            return noticeRepository.findByClassId(classId);
        }
    }








// 글 작성
    @PostMapping("/notice")
    public void createNotice(@RequestBody NoticeEntity noticeEntity){
        NoticeEntity notice = new NoticeEntity();
        notice.setClassId(noticeEntity.getClassId());
        notice.setTitle(noticeEntity.getTitle());
        notice.setClickCnt(noticeEntity.getClickCnt());
        notice.setDelYn(noticeEntity.getDelYn());
        notice.setContent(noticeEntity.getContent());
        notice.setAuthor(noticeEntity.getAuthor());
        notice.setAttach(noticeEntity.getAttach());
        notice.setCreateDate(LocalDateTime.now());

        noticeRepository.save(notice);
    }

    // 글 수정
    @PutMapping("/notice/{noticeId}")
    public NoticeEntity updateNotice(
            @PathVariable Long noticeId,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = false) String content

    ) {
        NoticeEntity notice = noticeRepository.findAllBy(noticeId);

        if (title.length() > 0) {
            notice.setTitle(title);
        }

        if (content.length() > 0) {
            notice.setContent(content);
        }


        noticeRepository.save(notice);
        return notice;
    }
// 글 삭제
    @DeleteMapping("/notice/{noticeId}")
    public void deleteNotice( @RequestBody NoticeEntity noticeEntity){
        noticeRepository.deleteById(noticeEntity.getNoticeId());
    }

}