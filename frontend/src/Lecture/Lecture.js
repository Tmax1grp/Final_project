import Navmenu from "../Home/Navmenu";
// import Openvidu from './Openvidu';

export default function Lecture() {
  
  return(
    <div>
      <Navmenu />
      {/* <Openvidu /> */}
      <iframe className="openvidu-iframe" src="https://3.17.41.125:3000" width="100%" height="1200" scrolling="yes"
        allow="camera; microphone"
      ></iframe>
      {/* <iframe src="/openvidu" width="75%" height="900" frameBorder="1" scrolling="no"></iframe> */}
      {/* <iframe src="#/" width="25%" height="900" frameBorder="1" scrolling="no"></iframe> */}
      {/* <portal src="http://localhost:3001"></portal> */}
      {/* <iframe src="https://demo.sir.kr/gnuboard5/" width="80%" height="1000" frameBorder="1" scrolling="no" jsessionid="<%=session.getId()%>"></iframe> */}
      {/* <iframe src="#" width="20%" height="1000" frameBorder="1" scrolling="no">채팅</iframe> */}
    </div>

    
  );
}