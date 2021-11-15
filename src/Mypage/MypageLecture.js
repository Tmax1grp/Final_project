import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell  } from '@mui/material';
import axios from 'axios';

import MypageClassItem from './MypageClassItem'

export default function MypageLecture() {
    const [myClasses, setMyClasses] = useState(null);
    const [aCat, setACat] = useState(false);

    useEffect(() => {
        axios.get('/classroom-service/lectures/all',
            { params: { userId: sessionStorage.userId } })
            .then(res => {
                // console.log(res.data)
                setMyClasses(res.data);
                setACat(false);
            })
            .catch((err) =>
                console.log(err)
            )
    }, [aCat])

    return (
        <TableContainer>
            <Table size="small" responsive="sm">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>강의이름</TableCell>
                        <TableCell align='center'>수강상태</TableCell>
                        <TableCell align='center'>수강취소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        myClasses !== null ?
                            myClasses.map(item => {
                                return (<MypageClassItem setACat={setACat} key={item.name} item={item} />);
                            })
                            :
                            <>수강 중인 강의 정보를 불러올 수 없습니다!</>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}