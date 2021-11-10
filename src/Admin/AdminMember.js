import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminMember() {
    const [members, setMembers] = useState(null);

    useEffect(() => {
        axios.get('/admin/user/all').then(res => {
            console.log(res.data)
            setMembers(res.data);
        }).catch((err) =>
            console.log(err)
        )
    }, [])

    return (
        <>
            {
                members != null ?
                    <>members: </> :
                    <>null</>
            }
        </>
    );
}