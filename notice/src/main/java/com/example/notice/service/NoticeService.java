package com.example.notice.service;

import com.example.notice.dto.NoticeDto;
import com.example.notice.entity.NoticeEntity;
import com.example.notice.jpa.NoticeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Slf4j
@Service
public class NoticeService {


    NoticeRepository noticeRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository){
        this.noticeRepository = noticeRepository;
    }

}