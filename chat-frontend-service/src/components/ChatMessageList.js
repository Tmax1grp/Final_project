import React, { useEffect } from 'react';
import ChatMessageCard from './ChatMessageCard';

function ChatMessageList({ messages }) {

    useEffect(() => {
    }, [messages])

    return (
        <>
            {
                messages.length > 0 ? messages.map(message => (
                    <ChatMessageCard key={message.id} message={message} />
                ))
                    :
                    ''
            }
        </>
    );
}

export default ChatMessageList;