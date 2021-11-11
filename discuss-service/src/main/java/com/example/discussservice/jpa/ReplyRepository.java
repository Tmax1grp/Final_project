package com.example.discussservice.jpa;

import com.example.discussservice.entity.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    ReplyEntity findByReplyId(Long replyId);



}