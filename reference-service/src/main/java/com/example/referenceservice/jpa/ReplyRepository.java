package com.example.referenceservice.jpa;

import com.example.referenceservice.entity.ReferenceEntity;
import com.example.referenceservice.entity.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    ReplyEntity findByReplyId(Long replyId);



    List<ReplyEntity> findReplyEntityByReferenceEntity(ReferenceEntity referenceEntity);


}