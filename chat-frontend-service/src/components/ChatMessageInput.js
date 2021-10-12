import React from 'react';

export default function MessageInput(props) {
    return (
        <div>
            <input type="button" onClick="setAttachment" />
            <input type="text" onChange="setInput" />
            <input type="button" onClick="handleSubmit" />
        </div>
    );
}