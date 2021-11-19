package com.example.adminservice.jpa;

import com.example.adminservice.entity.ClassroomEntity;
import com.example.adminservice.entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity, Long> {
    List<LectureEntity> findClassroomEntityByUserId(Long userId);

    @Query(value = "DELETE FROM lecture WHERE classroom_id = :ClassId", nativeQuery = true)
    List<LectureEntity> findLectureEntityByDelete(@Param("ClassId")Long classId);

    @Query(value = "UPDATE lecture SET \n" +
            "name = :Name, \n" +
            "content = :Content, \n" +
            "status = :Status \n" +
            "WHERE classroom_id = :Classroom_id", nativeQuery = true)
    LectureEntity findAllByLecture(@Param("Name")String name, @Param("Content") String content, @Param("Status")int status, @Param("Classroom_id") Long ClassId);
}
