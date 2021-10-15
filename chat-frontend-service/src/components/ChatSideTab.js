import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ChatSideTab({ setTabSelected }) {

    const setChatVisible = e => {
        setTabSelected(0);
    }

    const setMemberVisible = e => {
        setTabSelected(1);
    }

    return (
        <div>
            <Button class="tabButton" onClick={setChatVisible}> 채팅 </Button>
            <Button class="tabButton" onClick={setMemberVisible}> 참가자 </Button>
        </div>
    );
}