import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

import ChatContainer from './ChatContainer';

export default function ChatClassroom({ classID }) {
    const [messages, setMessages] = useState('');
    const [show, setShow] = useState(false);
    const target = useRef(null);

    //  TODO: 채팅 데이터가 많다면 컴포넌트 로딩 표시
    useEffect(() => {
        axios.get(`http://localhost:3006/messages?class_id=${classID}&to_id=sungho`)
            .then(res => {
                setMessages(res.data);
            })
    }, [classID]);

    return (
        <>

            <Button ref={target} onClick={() => setShow(!show)}>
                Click me!
            </Button>
            <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        <ChatContainer messages={messages} />
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}