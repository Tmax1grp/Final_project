import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageInput from './ChatMessageInput';

function ChatContainer(props) {
    return (
        <>
            <ChatMessageList />
            <ChatMessageInput />
        </>
    );
}

export default ChatContainer;