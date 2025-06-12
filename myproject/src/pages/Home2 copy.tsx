import React from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import "./Home2.css";
import { HomeCardButton } from "../beta_app/CardButton";

const Home2: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="home2-container">
        <header className="home2-header">
          <div className="home2-top">
            <button className="icon-btn">👤</button>
            <h1 className="logo">뚝닥터</h1>
            <button className="icon-btn">🔔</button>
          </div>
        </header>

        <div className="home2-banner">
          <div className="banner-icon">🚧</div>
          <div className="banner-text">
            <div className="location">(10km) 부산 공항로 출장 수리 요청</div>
            <div className="detail">내용: 스카니아560 R8X4 27톤 덤프트럭 엔진...</div>
          </div>
        </div>

        <section className="card-section">
          <div className="card-row">
            <HomeCardButton
              onClick={() => router.push('/thisisBeta')}
              color="white"
              imgSrc="/docWithPaperPlane.png"
              imgStyle={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                width: '76px',
                height: '76px',
              }}
              content="견적 보내기"
              desc={["견적 요청 확인하고","정비 매칭하기!"].join('\n')}
            />
            <HomeCardButton
              onClick={() => router.push('/thisisBeta')}
              color="white"
              imgSrc="/docWithCheck.png"
              imgStyle={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                width: '76px',
                height: '76px',
              }}
              content="보낸 견적"
              desc={["보낸 견적을","관리하세요!"].join('\n')}
            
            />
          </div>
          <div className="card-row">
            <HomeCardButton
              onClick={() => router.push('/thisisBeta')}
              color="white"
              imgSrc="/repairShop.png"
              imgStyle={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                width: '76px',
                height: '76px',
              }}
              content="MY 정비소"
              desc={["쉬운 정보, 리뷰","정비내역 관리!"].join('\n')}
            />
          </div>
        </section>

        <section className="schedule-section">
          <h2 className="section-title">정비소 일정 관리</h2>

          <div className="schedule-bar">
  {[24, 25, 26, 27, 28, 29, 30].map((day) => (
    <div
      className="day-box"
      key={day}
      onClick={() => router.push("/schedulecalendar")}
      style={{ cursor: "pointer" }}
    >
      <span className="day-number">{day}</span>
    </div>
  ))}
</div>

          <div className="schedule-legend">
            <span className="legend-box status-before">정비 전</span>
            <span className="legend-box status-progress">정비 중</span>
            <span className="legend-box status-done">정비 완료</span>
          </div>
        </section>

        <section className="news-section">
          <h2 className="section-title">최신 소식</h2>
          <div className="news-placeholder">뉴스가 여기에 표시됩니다.</div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home2;