import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatContainer from './ChatContainer';

export default function ChatClassroom({ classID }) {
    const [messages, setMessages] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/messages?class_id=${classID}`)
            .then(res => {
                setMessages(res.data);
            })
        return () => {

        }
    }, [classID]);

    return (
        <>
            <ChatContainer messages={messages} />
        </>
    );
}