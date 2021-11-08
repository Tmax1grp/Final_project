import Navmenu from "../Home/Navmenu";

export default function Lecture() {
  
  return(
    <div>
      <Navmenu />
      <iframe src="http://localhost:3001" width="75%" height="900" frameBorder="1" scrolling="no"></iframe>
      {/* <iframe src="#/" width="25%" height="900" frameBorder="1" scrolling="no"></iframe> */}
      {/* <portal src="http://localhost:3001"></portal> */}
      {/* <iframe src="https://demo.sir.kr/gnuboard5/" width="80%" height="1000" frameBorder="1" scrolling="no" jsessionid="<%=session.getId()%>"></iframe> */}
      {/* <iframe src="#" width="20%" height="1000" frameBorder="1" scrolling="no">채팅</iframe> */}
    </div>

    
  );
}