import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

import AdminMemberItem from './AdminMemberItem';

export default function AdminMember() {
    // const [members, setMembers] = useState(null);
    const members = [
        {
            "userId": "사용자1",
            "name": "일사용",
            "email": "1@study.com",
            "tel": "010-0000-0001",
            "createDate": "2021-11-11",
        },
        {
            "userId": "사용자2",
            "name": "이사용",
            "email": "2@study.com",
            "tel": "010-0000-0002",
            "createDate": "2021-12-22",
        }
    ]

    useEffect(() => {
        // axios.get('/admin/user/all').then(res => {
        //     console.log(res.data)
        //     setMembers(res.data);
        // }).catch((err) =>
        //     console.log(err)
        // )
    }, [])

    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>회원ID</th>
                        <th>회원가입일</th>
                        <th>회원정보수정</th>
                        <th>회원탈퇴</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members.map(member => {
                            return (<AdminMemberItem member={member} />);
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}