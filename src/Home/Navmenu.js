import React from 'react';
import styles from './Home.module.css';
import { Navbar } from 'react-bootstrap';

export default function Navmenu() {

  const Logout = () => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('tel')
    document.location.href = '/'
  }

  return(
    <div>
      <Navbar collapseOnSelect expand="lg" className={styles.top_nav}>
        <div className="container">
          <Navbar.Brand className={styles.nav_logo} href="/home" style={{color: "#FFCA95"}}>NICE TO MEET</Navbar.Brand>
          <div className={styles.menu_list}>
            <p className={styles.nav_p}><a className={styles.nav_a} href="/mypage"><i className="far fa-user fa-lg"></i> {sessionStorage.userName}님 </a>
            <button className={styles.logout} onClick={Logout}><i className="fas fa-sign-out-alt"></i></button></p>
          </div>
        </div>
      </Navbar>
    </div>
  );
}