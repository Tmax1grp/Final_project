import React from 'react';
import ChatSideTab from './ChatSideTab';
import ChatContainer from './ChatContainer';
import MembersContainer from './MembersContainer';

export default function Chat(props) {
    return (
        <>
            <ChatSideTab />
            <ChatContainer />
            <MembersContainer />
        </>
    );
}