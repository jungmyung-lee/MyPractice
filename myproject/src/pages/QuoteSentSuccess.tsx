import React from "react";
import { IonPage, useIonRouter } from "@ionic/react";
import "../beta_app/Layout.css";
import "./QuoteSentSuccess.css";
import { CloseButton, Button } from "../beta_app/Buttons";
import { SubTitle, Title } from "../beta_app/Title";

const QuoteSentSuccess: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <div className="container">
        {/* 상단 닫기 버튼 */}
        <div style={{ width: "100%", height: "64px", display: "flex", justifyContent: "flex-end" }}>
          <CloseButton onClick={() => router.push("/tabs2/home")} />
        </div>

        {/* 본문 */}
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        > 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
            <Title content={"견적이 전송되었어요 :)"} fontSize={28} />
            <Title content={"완료하고 앱을 사용해보세요!"} fontSize={28} />
            
            <div className="subtitle">
              <span style={{textDecorationLine: 'underline'}}
              onClick = {() => router.push('/tabs2/home')}> 보낸</span> 
              {' '}
              견적에서 견적 내역을 관리할 수 있어요!
            </div>
          </div>
        </div>

        {/* 하단 완료 버튼 */}
        <div className="button-wrapper">
          <Button content="완료" color="orange" onClick={() => router.push("/tabs2/home")} />
        </div>
      </div>
    </IonPage>
  );
};

export default QuoteSentSuccess;
