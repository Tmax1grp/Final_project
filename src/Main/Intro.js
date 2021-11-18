import React from 'react';
import styles from './Main.module.css'

export default function Inrto() {
  return (
    <div>
      <div>
        <div className={styles.intro}></div>
        <div className="row" style={{minHeight:"50vh"}}>
          <div className="col-6" style={{backgroundColor:"#20314E"}}>
            <p className={`${styles.introduceleft} m-4`} align="right" style={{fontSize:"xx-large"}}>Nice to meet과 함께하세요.</p>
            <p className={`${styles.introduceleft} m-4`} align="right">NOM은 화상채팅을 통해 공부하는 재택학습 플랫폼입니다.</p>
            <p className={`${styles.introduceleft} m-4`} align="right">때로는 집에서! 때로는 카페에서!</p>
            <p className={`${styles.introduceleft} m-4`} align="right">오프라인에 구애받지 않는 공부를 이어가세요.</p>
          </div>
          <div className="col-6" style={{backgroundColor:"#FFCA95"}}></div>
        </div>
      </div>
      <div className={styles.introright}>
        <div className="row" style={{minHeight:"50vh"}}>
          <div className="col-6" style={{backgroundColor:"#20314E"}}></div>
          <div className="col-6" style={{backgroundColor:"#FFCA95"}}>
            <p className={`${styles.introduceright} m-4`} style={{fontSize:"xx-large"}}>공부 방식은 모두 다릅니다.</p>
            <p className={`${styles.introduceright} m-4`}>누군가는 혼자 공부할 때 능률이 오릅니다.</p>
            <p className={`${styles.introduceright} m-4`}>하지만 또 다른 누군가는 여러 사람들이 있는 곳에서 더욱 집중력을 발휘합니다.</p>
            <p className={`${styles.introduceright} m-4`}>언택트가 일상이 된 포스트 코로나 시대,</p>
            <p className={`${styles.introduceright} m-4`}>NOM은 이러한 분들을 위해 탄생했습니다.</p>
          </div>
        </div>
      </div>

      <div>
        <div className="row" style={{minHeight:"50vh"}}>
          <div className="col-6" style={{backgroundColor:"#20314E"}}>
            <p className={`${styles.introduceleft} m-4`} align="right" style={{fontSize:"xx-large"}}>온라인 라이브 수업, NOM</p>
            <p className={`${styles.introduceleft} m-4`} align="right">NOM은 실시간 화상을 통해 강사와 학생의 교감을 이끌어 냅니다.</p>
          </div>
          <div className="col-6" style={{backgroundColor:"#FFCA95"}}></div>
        </div>
      </div>
      <div className={styles.introright}>
        <div className="row" style={{minHeight:"50vh"}}>
          <div className="col-6" style={{backgroundColor:"#20314E"}}>
          </div>
          <div className="col-6" style={{backgroundColor:"#FFCA95"}}>
            <p className={`${styles.introduceright} m-4`} style={{fontSize:"xx-large"}}>자유로운 지식 공유</p>
            <p className={`${styles.introduceright} m-4`}>NOM에서는 강사가 될 수 있고 학생도 될 수 있습니다.</p>
            <p className={`${styles.introduceright} m-4`}>본인의 지식을 가르치는 강사와 배우고자하는 강의를 듣는 학생이 될 수 있는</p>
            <p className={`${styles.introduceright} m-4`}>자유로운 지식 공유 플랫폼입니다.</p>
          </div>
        </div>
      </div>

      <div>
        <div className="row" style={{minHeight:"50vh"}}>
          <div className="col-6" style={{backgroundColor:"#20314E"}}>
            <p className={`${styles.introduceleft} m-4`} align="right" style={{fontSize:"xx-large"}}>화상 회의 기능</p>
            <p className={`${styles.introduceleft} m-4`} align="right">수업 도중 화면 공유, 마이크 카메라 on/off기능,</p>
            <p className={`${styles.introduceleft} m-4`} align="right">실시간 채팅 등을 자유롭게 진행 할 수 있습니다.</p>
          </div>
          <div className="col-6" style={{backgroundColor:"#FFCA95"}}></div>
        </div>
      </div>
      <div className={styles.introright}>
        <div className="row" style={{minHeight:"50vh"}}>
          <div className="col-6" style={{backgroundColor:"#20314E"}}>
          </div>
          <div className="col-6" style={{backgroundColor:"#FFCA95"}}>
            <p className={`${styles.introduceright} m-4`} style={{fontSize:"xx-large"}}>활성화된 강의 기능</p>
            <p className={`${styles.introduceright} m-4`}>수강을 원하는 학생은 특정 강의를 수강신청 할 수 있으며</p>
            <p className={`${styles.introduceright} m-4`}>강의하려는 강사는 강의 생성을 통해 강의를 진행할 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div align="center" style={{backgroundColor:"#20314E", height:"70px"}}>
        <p className={`${styles.introduceright}`} style={{color:"#FFCA95", fontSize:"xx-large", padding:"15px 0 0 0"}}>재택학습, 이젠 NOM과 함께하세요</p>
      </div>
    </div>
  );
}