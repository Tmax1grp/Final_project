import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';

import ChatContainer from './ChatContainer';

export default function ChatClassroom({ classID }) {
    const [messages, setMessages] = useState('');
    const [show, setShow] = useState(false);
    const target = useRef(null);

    //  TODO: 채팅 데이터가 많다면 컴포넌트 로딩 표시

    useEffect(() => {
        if (classID !== null)
            axios({
                method: 'get',
                // method: 'post',
                url: `http://10.10.20.36:8000/chat-service/class/${classID}/lecture`,
                // url: `http://localhost:55000/class/22105`,
                params: (
                    {
                        fromId: "123",
                        // toId:"123",
                        // chatContent:"dd5ssdfffs6sssssddsdfd23asdf2323sdfss"
                    }
                )
            })
                .then(res => {
                    console.log(res.data);
                    setMessages(res.data);
                })
    }, [classID])

    return (
        <>

            <Button ref={target} onClick={() => setShow(!show)}>
                Click me!
            </Button>
            <Modal dialogClassName="chat-modal-content" show={show} onHide={() => setShow(!show)}>
                <Modal.Header>
                    <Modal.Title>실시간 채팅</Modal.Title>
                    <Button variant="secondary" onClick={() => setShow(!show)}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <ChatContainer messages={messages} />
                </Modal.Body>
            </Modal>
        </>
    );
}