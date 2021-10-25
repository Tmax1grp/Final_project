package com.example.notice.controller;


import com.example.notice.entity.NoticeEntity;
import com.example.notice.jpa.NoticeRepository;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@Controller
@RequestMapping("/")
@Slf4j
//@CrossOrigin(origins = {"http://localhost:3000"})
public class NoticeController {


    private NoticeRepository noticeRepository;

    @Autowired
    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @GetMapping("/notice")
    public List<NoticeEntity> allSearchNotice(){
        return noticeRepository.findAll();
    }

    @GetMapping("/notice/{notice_id}")
    public List<NoticeEntity> searchNotice(@RequestBody NoticeEntity noticeEntity){
        final List<NoticeEntity> noticeList =
                noticeRepository.findNoticeEntityNotice_id(
                        noticeEntity.getNotice_id()
                );
        return noticeList;
    }

    @PostMapping("/notice")
    public void createNotice(@RequestBody NoticeEntity noticeEntity){
        NoticeEntity notice = new NoticeEntity();
        notice.setNotice_id(noticeEntity.getNotice_id());
        notice.setClass_id(noticeEntity.getClass_id());
        notice.setTitle(noticeEntity.getTitle());
        notice.setClick_cnt(noticeEntity.getClick_cnt());
        notice.setDelyn(noticeEntity.getDelyn());
        notice.setContent(noticeEntity.getContent());
        notice.setAuthor(noticeEntity.getAuthor());
        notice.setAttach(noticeEntity.getAttach());
        notice.setCreate_date(noticeEntity.getCreate_date());

        noticeRepository.save(notice);
    }

    @DeleteMapping("/notice")
    public void deleteNotice(@RequestBody NoticeEntity noticeEntity){
        noticeRepository.deleteById(noticeEntity.getNotice_id());
    }

}
