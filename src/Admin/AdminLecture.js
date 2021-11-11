import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

import AdminClassItem from './AdminClassItem';
import AdminCreateClassForm from './AdminCreateClassForm';

export default function AdminLecture() {
    const [classes, setClasses] = useState(null);
    // let classes = [
    //     {
    //         "name": "강의1",
    //         "imgPath": "이미지1",
    //         "userId": "강사1",
    //         "content": "강의내용1",
    //         "participantNum": "수강인원수1",
    //         "status": "강의 상태1",
    //         "createdDate": "2021-11-11"
    //     },
    //     {
    //         "name": "강의2",
    //         "imgPath": "이미지2",
    //         "userId": "강사2",
    //         "content": "강의내용2",
    //         "participantNum": "수강인원수2",
    //         "status": "강의 상태2",
    //         "createdDate": "2021-12-22"
    //     }
    // ]

    useEffect(() => {
        axios.get('/admin-service/admin/classroom/all').then(res => {
            console.log(res.data)
            setClasses(res.data);
        }).catch((err) =>
            console.log(err)
        )
    }, [])

    return (
        <>
            <AdminCreateClassForm />
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>강의이름</th>
                        <th>강의생성일</th>
                        <th>강의정보수정</th>
                        <th>강의삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes != null ?
                            classes.map(item => {
                                return (<AdminClassItem key={item.name} item={item} />);
                            })
                            :
                            <>강의 데이터를 불러올 수 없습니다.</>
                    }
                </tbody>
            </Table>
        </>
    );
}