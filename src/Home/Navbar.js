

export default function Navbar() {
  return (
    <div style={{backgroundColor:"#20314E"}}>
      <nav className="navbar">
        <a href="/home"><span className="navbar-brand">NICE TO MEET</span></a>
        <div className="m-1">
          <button type="button" className="btn-start"><i className="fas fa-sign-out-alt"></i></button>
          <button type="button" className="btn-start">로그인</button>
          <button type="button" className="btn-start">회원가입</button>
        </div>
      </nav>
    </div>
  );
}