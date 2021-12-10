package com.example.discussservice.jpa;

import com.example.discussservice.entity.DiscussEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussRepository extends JpaRepository<DiscussEntity, Long> {
    List<DiscussEntity> findDiscussEntityByDiscussId(Long discussId);


    DiscussEntity findByDiscussId(Long discussId);

    //Page<DiscussEntity> findAll(Pageable pageable);


    Page<DiscussEntity> findAll(Pageable pageable);


    Page<DiscussEntity> findByClassId(Long classId, Pageable pageable);
//    @Query(
//            value = "SELECT * FROM notice WHERE notice.title LIKE :notice.title OR notice.author LIKE :notice.author",
//            nativeQuery = true)
//    List<NoticeEntity> findByClassIdAndAuthor(Long noticeId, String author);
//    List<NoticeEntity> findByClassIdAndTitle(Long noticeId, String title);
//

    @Query(
            value = " SELECT * FROM discuss " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND user_name LIKE %:UserName%  "
            , nativeQuery = true
    )
    Page<DiscussEntity> findByClassIdUserName(@Param("ClassId") Long classId, @Param("UserName") String userName, Pageable pageable);
    @Query(
            value = " SELECT * FROM discuss " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND title LIKE %:Title%  "
            , nativeQuery = true
    )
    Page<DiscussEntity> findByClassIdTitle(@Param("ClassId") Long classId, @Param("Title") String title, Pageable pageable);
    List<DiscussEntity> findByClassId(long classId);


    @Query(value = " SELECT * FROM discuss WHERE discuss_id LIKE :DiscussId", nativeQuery = true)
    DiscussEntity findAllBy(@Param("DiscussId") Long DiscussId);

}
