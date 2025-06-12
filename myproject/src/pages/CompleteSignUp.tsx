import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import "./CompleteSignUp.css";

const CompleteSignUp: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="complete-container">
          <div className="close-button">✕</div>

          <div className="title">환영합니다 :)<br />회원가입이 완료되었어요!</div>
          <div className="subtitle">쉽고 빠르게 기계장비를 등록할 수 있어요!</div>

          <div className="machine-preview">
            <img
              src="https://cdn.pixabay.com/photo/2017/06/22/20/18/mobile-crane-2431290_1280.jpg"
              alt="기계 이미지"
              className="machine-image"
            />
            <div className="machine-text">
              <div>예) 123가 4567</div>
              <div>예) 립헬 LTM 1030-2.1</div>
            </div>
          </div>

          <button className="primary-button">기계 등록하기</button>
          <button className="secondary-button">다음에 등록하기</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CompleteSignUp;
