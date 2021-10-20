package com.example.board.controller;



import com.example.board.service.BoardService;
import com.example.board.dto.BoardDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@Slf4j
@Controller
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class BoardController {
    private BoardService boardService;

    /* 게시글 목록 */
    @GetMapping("/notice")
    public String list(Model model) {
        List<BoardDto> boardList = boardService.getBoardlist();

        model.addAttribute("boardList", boardList);
        return "board/list.html";
    }

    @GetMapping("/notice")
    public String detail(@PathVariable("no") Long no, Model model) {
        BoardDto boardDTO = boardService.getPost(no);

        model.addAttribute("boardDto", boardDTO);
        return "board/detail.html";
    }

    @GetMapping("/notice/{notice_id}")
    public String edit(@PathVariable("no") Long no, Model model) {
        BoardDto boardDTO = boardService.getPost(no);

        model.addAttribute("boardDto", boardDTO);
        return "board/update.html";
    }

    @PutMapping("/notice/{notice_id}")
    public String update(BoardDto boardDTO) {
        boardService.savePost(boardDTO);

        return "redirect:/";
    }

    @DeleteMapping("/notice/{notice_id}")
    public String delete(@PathVariable("no") Long no) {
        boardService.deletePost(no);

        return "redirect:/";
    }

}