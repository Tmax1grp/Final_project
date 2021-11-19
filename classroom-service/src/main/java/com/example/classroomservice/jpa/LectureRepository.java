package com.example.classroomservice.jpa;

import com.example.classroomservice.entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity,Long> {
    List<LectureEntity> findClassroomEntityByUserId(Long userId);

    @Query(value = "SELECT * FROM lecture WHERE classroom_id LIKE :ClassId", nativeQuery = true)
    LectureEntity findLectureEntityByDelete(@Param("ClassId")Long classId);
}
