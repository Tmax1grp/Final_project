package com.example.discussservice.controller;


import com.example.discussservice.entity.DiscussEntity;
import com.example.discussservice.jpa.DiscussRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")
public class DiscussController {

    @Autowired
    private DiscussRepository discussRepository;

    @GetMapping("/discuss/findall")
    public List<DiscussEntity> allSearchDiscuss() {
        return discussRepository.findAll();
    }

    @GetMapping("/discuss/{discussId}")
    public List<DiscussEntity> searchDiscuss(@PathVariable String discussId , @RequestBody DiscussEntity discussEntity){
        final List<DiscussEntity> discussList =
                discussRepository.findDiscussEntityByDiscussId(
                        discussEntity.getDiscussId()
                );
        return discussList;
    }

    @PostMapping("/discuss")
    public void createDiscuss(@RequestBody DiscussEntity discussEntity){
        DiscussEntity discuss = new DiscussEntity();
        discuss.setClassId(discussEntity.getClassId());
        discuss.setTitle(discussEntity.getTitle());
        discuss.setClickCnt(discussEntity.getClickCnt());
        discuss.setDelYn(discussEntity.getDelYn());
        discuss.setContent(discussEntity.getContent());
        discuss.setAuthor(discussEntity.getAuthor());
        discuss.setAttach(discussEntity.getAttach());
        discuss.setCreateDate(LocalDateTime.now());

        discussRepository.save(discuss);
    }

    @DeleteMapping("/discuss")
    public void deleteDiscuss(@RequestBody DiscussEntity discussEntity){
        discussRepository.deleteById(discussEntity.getClassId());
    }

}
