import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageInput from './ChatMessageInput';

function ChatContainer({messages}) {
    
    return (
        <>
            <ChatMessageList messages={messages}/>
            <ChatMessageInput />
        </>
    );
}

export default ChatContainer;