package com.example.noticeservice.controller;


import com.example.noticeservice.entity.NoticeEntity;
import com.example.noticeservice.entity.ReplyEntity;
import com.example.noticeservice.jpa.NoticeRepository;

import com.example.noticeservice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/{classId}")

public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;






// 전체조회
    @GetMapping("/notice/all/{page}")
public Page<NoticeEntity> allSearchNotice( @PathVariable Long classId, @PathVariable int page){
        if(page <= 1)
            page = 1;
        PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("noticeId") );
//    return noticeRepository.findAll(PageRequest.of(1,10, Sort.Direction.DESC,"noticeId"));
        return noticeRepository.findByClassId(classId ,pageRequest);
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
    @PutMapping("/notice/search/{page}")
    public Page<NoticeEntity> allSearchNotice(@PathVariable Long classId,
                                              @RequestParam(value = "title", required = false) String title,
                                              @RequestParam(value = "userName", required = false) String userName,
                                              //@RequestBody NoticeEntity noticeEntity,
                                              @PathVariable int page
    ){
        if(page <= 1)
            page = 1;
        PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("notice_id") );
        PageRequest pageRequestall = PageRequest.of(page-1, 10,Sort.Direction.DESC,("noticeId") );

//        if(noticeEntity.getTitle().length() > 0){
          if(title != ""){
            return noticeRepository.findByClassIdTitle(classId, title, pageRequest);
        }
          else if(userName != ""){
//        else if(noticeEntity.getUserName().length() > 0){
            return noticeRepository.findByClassIdUserName(classId,userName, pageRequest);
        }
        else{
            return noticeRepository.findByClassId(classId, pageRequestall);
        }
    }

// 글 작성
    @PostMapping("/notice")
    public void createNotice(@RequestBody NoticeEntity noticeEntity){
        NoticeEntity notice = new NoticeEntity();
        notice.setClassId(noticeEntity.getClassId());
        notice.setTitle(noticeEntity.getTitle());
        notice.setClickCnt(0L);
        notice.setDelYn("0");
        notice.setContent(noticeEntity.getContent());
//        notice.setContent("asdfsdfsdf");
        notice.setUserName(noticeEntity.getUserName());
        notice.setUserId(noticeEntity.getUserId());
        notice.setAttach("1");
        notice.setCreateDate(LocalDateTime.now());

        noticeRepository.save(notice);
    }



    // 글 수정
    @PutMapping("/notice/{noticeId}")
    public NoticeEntity updateNotice(
            @PathVariable Long classId,
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
    public void deleteNotice( @PathVariable Long noticeId){
//    public void deleteNotice( @PathVariable Long noticeId, @RequestBody NoticeEntity noticeEntity){
//        noticeRepository.deleteById(noticeEntity.getNoticeId());
        noticeRepository.deleteById(noticeId);
    }




}
