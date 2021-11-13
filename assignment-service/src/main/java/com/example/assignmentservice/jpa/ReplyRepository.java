package com.example.assignmentservice.jpa;

import com.example.assignmentservice.entity.AssignmentEntity;
import com.example.assignmentservice.entity.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    ReplyEntity findByReplyId(Long replyId);


    List<ReplyEntity> findReplyEntityByAssignmentEntity(AssignmentEntity assignmentEntity);



}