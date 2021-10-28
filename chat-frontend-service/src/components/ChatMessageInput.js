import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { BsPaperclip } from "react-icons/bs";

// TODO
// * 입력 필드 세부화
// * - 텍스트 필드
// * - 파일 첨부완료 시, 파일 삭제 버튼 표시
export default function MessageInput(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelected = e => {
        // TODO: S3 파일 업로드 및 메시지 입력 필드에 표시, 입력 비활성화
        // * 현재 단일 파일 첨부
        let file = e.target.files[0];
        if (file !== undefined) {
            console.log(file);
            setSelectedFile(file);
        }
        return 0;
    }

    const handleSubmit = () => {
        // TODO: 세션 연결 확인 & 메시지 전송 POST API 요청
        return 0;
    }

    const handleTextInput = () => {

    }

    return (
        <div>
            <label for="file-upload"><BsPaperclip /></label>
            <input
                id="file-upload"
                style={{ display: 'none' }}
                type="file"
                onChange={handleFileSelected}
            />
            {/** 파일 첨부를 위한 input field */}
            {/* <input type="text" /> */}
            <input type="text" onChange={handleTextInput} />
            <Button onClick={handleSubmit}>전송</Button>
        </div>
    );
}