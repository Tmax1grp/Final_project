import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatContainer from './ChatContainer';
import MembersContainer from './MembersContainer';
import ChatSideTab from './ChatSideTab';

export default function ChatLecture({ classID }) {
    const [tabSelected, setTabSelected] = useState(0);
    const [members, setMembers] = useState(0);
    const [messages, setMessages] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3001/messages?class_id=${classID}`)
            .then(res => {
                setMessages(res.data);
            })
        return () => {

        }
    }, [])

    return (
        <>
            < ChatSideTab class="sideTab" setTabSelected={setTabSelected} />
            {
                tabSelected == 0 ?
                    < ChatContainer messages={messages} /> :
                    < MembersContainer members={members} />
            }
        </>
    );
}