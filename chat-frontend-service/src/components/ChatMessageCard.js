import React, { useState, useEffect } from 'react';

export default function ChatMessageCard({ message }) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [wdate, setWdate] = useState('');
    const [attach, setAttach] = useState('');

    // TODO: 불러온 메시지 없을 때 다른 컴포넌트 출력
    useEffect(() => {
        if (message !== undefined) {
            setAuthor(message.from_id);
            setContent(message.chat_content);
            setWdate(message.chat_date);
            setAttach(message.attach);
        }
        else {
            setAuthor('author');
            setContent('content');
            setWdate('wdate');
        }
    }, [message]);

    return (
        <>
            <div class="d-flex justify-content-center">
                <div>[{wdate}]</div>
                <div>{author}:</div>
                <div>{content}</div>
                <div>{attach}</div>
            </div>
        </>
    );
}