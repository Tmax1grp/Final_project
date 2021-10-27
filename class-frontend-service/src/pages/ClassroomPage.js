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
                <p>{clas.classroomId}</p>
            </div>
        )
    })
    return(
        <div>
            
            <button><a href="/classpage">{classeslist}</a></button>
        </div>
    );
}

