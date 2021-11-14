package com.example.referenceservice.service;


import com.example.referenceservice.jpa.ReferenceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ReferenceService {

    ReferenceRepository referenceRepository;

    @Autowired
    public ReferenceService(ReferenceRepository referenceRepository){
        this.referenceRepository = referenceRepository;
    }
}
