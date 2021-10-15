import React from 'react';
import Button from 'react-bootstrap/Button'

export default function MessageInput(props) {
    const setAttachment = () => {

    }
    const handleSubmit = () => {

    }
    return (
        <div>
            <Button onClick="setAttachment">+</Button>
            <input type="text" onChange="setInput" />
            <Button onClick="handleSubmit">전송</Button>
        </div>
    );
}