package com.example.referenceservice.jpa;

import com.example.referenceservice.entity.ReferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenceRepository extends JpaRepository<ReferenceEntity, Long> {

    List<ReferenceEntity> findReferenceEntityByReferenceId(Long referenceId);
}
