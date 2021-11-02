package com.example.assignmentservice.jpa;

import com.example.assignmentservice.entity.AssignmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<AssignmentEntity, Long> {
    List<AssignmentEntity> findAssignmentEntityByAssignmentId(Long AssignmentId);
}
