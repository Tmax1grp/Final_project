package com.example.referenceservice.jpa;

import com.example.referenceservice.entity.ReferenceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenceRepository extends JpaRepository<ReferenceEntity, Long> {

    List<ReferenceEntity> findReferenceEntityByReferenceId(Long referenceId);

    ReferenceEntity findByReferenceId(Long referenceId);


    Page<ReferenceEntity> findAll(Pageable pageable);


    Page<ReferenceEntity> findByClassId(Long classId, Pageable pageable);
//    @Query(
//            value = "SELECT * FROM notice WHERE notice.title LIKE :notice.title OR notice.author LIKE :notice.author",
//            nativeQuery = true)
//    List<NoticeEntity> findByClassIdAndAuthor(Long noticeId, String author);
//    List<NoticeEntity> findByClassIdAndTitle(Long noticeId, String title);
//

    @Query(
            value = " SELECT * FROM reference " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND author LIKE %:Author%  "
            , nativeQuery = true
    )
    Page<ReferenceEntity> findByClassIdUserName(@Param("ClassId") Long classId, @Param("UserName") String userName, Pageable pageable);

    @Query(
            value = " SELECT * FROM reference " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND title LIKE %:Title%  "
            , nativeQuery = true
    )
    Page<ReferenceEntity> findByClassIdTitle(@Param("ClassId") Long classId, @Param("Title") String title, Pageable pageable);

    List<ReferenceEntity> findByClassId(long classId);


    @Query(value = " SELECT * FROM reference WHERE reference_id LIKE :ReferenceId", nativeQuery = true)
    ReferenceEntity findAllBy(@Param("ReferenceId") Long ReferenceId);

}