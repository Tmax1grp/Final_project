package com.example.board.jpa;

import com.example.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
}