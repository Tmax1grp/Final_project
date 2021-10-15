import React, { useEffect } from 'react';
import ChatMessage from './ChatMessage';

function ChatMessageList({ messages }) {

    useEffect(() => {
        console.log(messages);
        return () => {
        }
    }, [messages])

    return (
        <>
            {
                messages.length > 0 ? messages.map(message => (
                    <ChatMessage message={message} />
                ))
                    :
                    <ChatMessage />
            }
        </>
    );
}

export default ChatMessageList;