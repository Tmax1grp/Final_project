package com.example.notice.controller;


import com.example.notice.dto.NoticeDto;
import com.example.notice.entity.NoticeEntity;
import com.example.notice.jpa.NoticeRepository;
import com.example.notice.service.NoticeService;
import org.modelmapper.ModelMapper;


import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/{classId}")
//@CrossOrigin(origins = {"http://localhost:3000"})
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;
    private NoticeService noticeService;

//    @Autowired
//    public NoticeController(NoticeRepository noticeRepository) {
//        this.noticeRepository = noticeRepository;
//    }

    @GetMapping("/notice/findall")
    public List<NoticeEntity> allSearchNotice(){
        return noticeRepository.findAll();
    }

//    @GetMapping("/notice/{noticeId}")
//    public List<NoticeEntity> searchNotice(  @PathVariable("noticeId") Long noticeId , @RequestBody NoticeEntity noticeEntity){
//        final List<NoticeEntity> noticeList =
//                noticeRepository.findNoticeEntityByNoticeId(
//                        noticeEntity.getNoticeId()
//                );
//        return noticeList;
//    }



    @GetMapping("/notice/{noticeId}")
    public NoticeEntity searchNotice(@PathVariable Long noticeId,
                                     @RequestParam(value = "clickCnt", required = false) Integer clickCnt ){

//        final List<NoticeEntity> noticeList =
//                noticeRepository.findNoticeEntityByNoticeId(
//                        noticeEntity.getNoticeId()
//
//                        );
//            NoticeEntity noticeEntity1 = NoticeEntity;


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

    @PutMapping("/notice")
    public void UpdateNotice(@RequestBody NoticeEntity noticeEntity){

        Optional<NoticeEntity> notice = noticeRepository.findById(1L);
        notice.ifPresent(selectNotice->{
            selectNotice.setTitle(selectNotice.getTitle());
            selectNotice.setContent(selectNotice.getContent());
            selectNotice.setAttach(selectNotice.getAttach());
            noticeRepository.save(selectNotice);
        });

    };


    @DeleteMapping("/notice")
    public void deleteNotice( @RequestBody NoticeEntity noticeEntity){
        noticeRepository.deleteById(noticeEntity.getNoticeId());
    }

}