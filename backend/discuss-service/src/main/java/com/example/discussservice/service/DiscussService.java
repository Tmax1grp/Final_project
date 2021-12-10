package com.example.discussservice.service;


import com.example.discussservice.jpa.DiscussRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class DiscussService {

    DiscussRepository discussRepository;

    @Autowired
    public DiscussService(DiscussRepository discussRepository){
        this.discussRepository = discussRepository;
    }
}
