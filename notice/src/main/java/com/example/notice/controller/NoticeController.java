package com.example.notice.controller;


import com.example.notice.entity.NoticeEntity;
import com.example.notice.jpa.NoticeRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/")
//@CrossOrigin(origins = {"http://localhost:3000"})
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;


//    @Autowired
//    public NoticeController(NoticeRepository noticeRepository) {
//        this.noticeRepository = noticeRepository;
//    }

    @GetMapping("/notice/findall")
    public List<NoticeEntity> allSearchNotice(){
        return noticeRepository.findAll();
    }

    @GetMapping("/notice/{classroomId}")
    public List<NoticeEntity> searchNotice( @PathVariable String classroomId , @RequestBody NoticeEntity noticeEntity){
        final List<NoticeEntity> noticeList =
                noticeRepository.findNoticeEntityByNoticeId(
                        noticeEntity.getNoticeId()
                );
        return noticeList;
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
        notice.setCreateDate(noticeEntity.getCreateDate());

        noticeRepository.save(notice);
    }

    @DeleteMapping("/notice")
    public void deleteNotice(@RequestBody NoticeEntity noticeEntity){
        noticeRepository.deleteById(noticeEntity.getNoticeId());
    }

}