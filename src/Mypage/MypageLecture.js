import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

import MypageClassItem from './MypageClassItem'

export default function MypageLecture() {
    const [myClasses, setMyClasses] = useState(null);

    useEffect(() => {
        axios.get('/classroom-service/lectures/all',
            { params: { userId: sessionStorage.userId } })
            .then(res => {
                console.log(res.data)
                setMyClasses(res.data);
            })
            .catch((err) =>
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
                        <th>수강상태</th>
                        <th>수강취소</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myClasses !== null ?
                            myClasses.map(item => {
                                return (<MypageClassItem key={item.name} item={item} />);
                            })
                            :
                            <>수강 중인 강의 정보를 불러올 수 없습니다!</>
                    }
                </tbody>
            </Table>
        </>
    );
}