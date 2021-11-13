package com.example.noticeservice.jpa;

import com.example.noticeservice.entity.NoticeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {

    List<NoticeEntity> findNoticeEntityByNoticeId(Long noticeId);


    NoticeEntity findByNoticeId(Long noticeId);


    Page<NoticeEntity> findAll(Pageable pageable);


//    @Query(
//            value = "SELECT * FROM notice WHERE notice.title LIKE :notice.title OR notice.author LIKE :notice.author",
//            nativeQuery = true)
//    List<NoticeEntity> findByClassIdAndAuthor(Long noticeId, String author);
//    List<NoticeEntity> findByClassIdAndTitle(Long noticeId, String title);
//

    @Query(
            value = " SELECT * FROM notice " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND author LIKE %:Author%  "
            , nativeQuery = true
    )
    List<NoticeEntity> findByClassIdAndAuthor(@Param("ClassId") Long classId, @Param("Author") String author);

    @Query(
            value = " SELECT * FROM notice " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND title LIKE %:Title%  "
            , nativeQuery = true
    )
    List<NoticeEntity> findByClassIdAndTitle(@Param("ClassId") Long classId, @Param("Title") String title);

    List<NoticeEntity> findByClassId(long classId);


    @Query(value = " SELECT * FROM notice WHERE notice_id LIKE :NoticeId", nativeQuery = true)
    NoticeEntity findAllBy(@Param("NoticeId") Long NoticeId);

}
