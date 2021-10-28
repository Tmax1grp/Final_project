import React,{useEffect, useState}  from 'react'
import axios from 'axios'



export default function ClassroomPage(){
    
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get('/classroom-service/lectures/findall')
        .then(res => {
            console.log(res.data)
            setClasses(res.data);
        })
        .catch((err) =>
          console.log(err)
        )
      },[])
    
    const classeslist = classes.map((clas) => {
        return (
            <div>
                <button className="btn btn-outline-primary" style={{margin:"10px"}}>
                    <a href="/classpage">
                        <div>
                            <p>{clas.name}</p>     
                        </div>
                    </a>
                </button>
                <br/>
            </div>
        )
    })
    return(
        <div>
            <a href="http://10.10.20.16:3000">HOME</a><br/>
            <h2>강의실</h2>
            {classeslist}
            <br/>
            <button><a href='https://3.17.41.125:5000'>화상회의</a></button>
            <br/>
            <button><a href='http://10.10.20.69:3002/classroom'>채팅</a></button>
            
        </div>
    );
}

