import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ChatSideTab({ tabSelected, setTabSelected }) {

    const handleTabClick = e => {
        let tabName = e.target.name;
        let buttonId = 0;

        if (tabName.toString() === "chatTabBtn")
            buttonId = 1;
        else if (tabName.toString() === "membersTabBtn")
            buttonId = 2;
        else
            console.log('ERROR: handleTabClick');

        if (buttonId === tabSelected)
            setTabSelected(0);
        else
            setTabSelected(buttonId);
    }

    return (
        <div>
            <Button name="chatTabBtn" onClick={handleTabClick}> 채팅 </Button>
            <Button name="membersTabBtn" onClick={handleTabClick}> 참가자 </Button>
        </div>
    );
}