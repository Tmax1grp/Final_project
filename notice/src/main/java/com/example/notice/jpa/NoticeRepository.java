package com.example.notice.jpa;

import com.example.notice.entity.NoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {

    List<NoticeEntity> findNoticeEntityByNoticeId(Long noticeId);
    NoticeEntity findByNoticeId(Long noticeId);

    @Query(
            value = "SELECT * FROM notice WHERE notice.title LIKE :notice "
    )



}
