import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageInput from './ChatMessageInput';

//  TODO: 채팅 데이터가 일정 이상에서 스크롤
//  TODO: 채팅 데이터가 많다면 컴포넌트 로딩 표시
function ChatContainer({ messages }) {

    return (
        <div>
            <ChatMessageList messages={messages} />
            <ChatMessageInput />
        </div>
    );
}

export default ChatContainer;