import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

import AdminClassItem from './AdminClassItem';

export default function AdminLecture() {
    const [classes, setClasses] = useState(null);

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
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>강의이름</th>
                        <th>강사ID</th>
                        <th>수강정원</th>
                        <th>상태</th>
                        <th>생성일</th>
                        <th>정보수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes !==null ?
                            classes.map(item => {
                                return (<AdminClassItem key={item.classId} item={item} />);
                            })
                            :
                            <>강의 데이터를 불러올 수 없습니다.</>
                    }
                </tbody>
            </Table>
        </>
    );
}