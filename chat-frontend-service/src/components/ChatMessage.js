import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatMessage({ message }) {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [wdate, setWdate] = useState('');
    const [attach, setAttach] = useState('');

    // 불러온 메시지 없을 때 다른 컴포넌트 출력하도록 할 것
    useEffect(() => {
        if (message !== undefined) {
            // console.log(message.chat_content);
            // console.log(message.from_id);
            // console.log(message.chat_date);
            setContent(message.chat_content);
            setAuthor(message.from_id);
            setWdate(message.chat_date);
        }
        else {
            setContent('content');
            setAuthor('author');
            setWdate('wdate');
        }
    }, [message]);

    return (
        <>
        <div class="d-flex justify-content-center">
            <div>{content}</div>
            <div>{author}</div>
            <div>{wdate}</div>
            </div>
        </>
    );
}

export default ChatMessage;