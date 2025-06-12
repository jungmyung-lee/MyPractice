import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import './GarageDetailPage1.css';
import { RightArrowButton, Button, BackButton, CloseButton } from "../beta_app/Buttons";
import { useHistory, useParams } from "react-router-dom";
import { getGarageById } from "../services/garageService";
import {IonModal, IonTextarea, IonItem, IonLabel, IonButton,
} from "@ionic/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

interface GarageData {
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  phone: string;
  mainServices: string[] | string;
}

const GarageDetailPage1: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [garage, setGarage] = useState<GarageData | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'review' | 'repair' | 'etc'>('info');
  const [showModal, setShowModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const sendFeedback = async () => {
  const user = auth.currentUser;
  try {
    await addDoc(collection(db, "GarageFeedbacks"), {
      garageId: id,
      garageName: garage?.name || "알 수 없음",
      userId: user?.uid || "anonymous",
      message: feedbackMsg,
      submittedAt: serverTimestamp(),
    });
    alert("✅ 피드백이 전송되었습니다.");
    setShowModal(false);
    setFeedbackMsg("");
  } catch (err) {
    console.error("❌ 피드백 전송 실패:", err);
    alert("❌ 피드백 전송에 실패했습니다.");
  }
};


  useEffect(() => {
    const fetchGarage = async () => {
      const data = await getGarageById(id);
      setGarage(data);
    };
    fetchGarage();
  }, [id]);

  const renderTabContent = () => {
    if (!garage) return <div style={{ padding: 20 }}>로딩 중...</div>;

    const services =
      typeof garage.mainServices === 'string'
        ? JSON.parse(garage.mainServices.replace(/'/g, '"')).join(', ')
        : garage.mainServices.join(', ');

    switch (activeTab) {
      case 'info':
        return (
          <>
            <div className="info-card">
              <div className="info-item">
                <span className="icon">📍</span>
                {garage.address}
              </div>
              <div className="info-item">
                <span className="icon">⏰</span>
                <div className="hours">
                  <p>월~금 정보없음</p>
                  <p>토~일 정보없음</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">☎️</span>
                {garage.phone}
              </div>
              <div className="info-item">
                <span className="icon">🔧</span>
                {services}
              </div>
              <div className="info-item">
                <span className="icon">📝</span>
                {garage.description}
              </div>
              <div className="info-item">
                
                
              </div>
            </div>
    
          </>
        );
      default:
        return <div className="empty-tab"></div>;
    }
  };

  return (
    <IonPage>
      <IonContent className="garage-detail-content">
        <div className="header">
          <div className="header-buttons">
            <BackButton onClick={() => window.history.back()} />
            <CloseButton onClick={() => history.push('/')} />
          </div>
          <img src="/repairShop.png" alt="정비소" className="garage-image" />



          <h1 className="title">{garage ? garage.name : '정비소 정보'}</h1>

          <div className="tags">
            {garage
              ? typeof garage.mainServices === 'string'
                ? JSON.parse(garage.mainServices.replace(/'/g, '"')).join(', ')
                : garage.mainServices.join(', ')
              : ''}
          </div>
          <div className="rating">
            <span className="star">★</span> 4/5 (리뷰 0)
          </div>
        </div>

        <div className="tab-bar">
          <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>업체 정보</button>
          <button className={`tab ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>리뷰/평점</button>
          <button className={`tab ${activeTab === 'repair' ? 'active' : ''}`} onClick={() => setActiveTab('repair')}>정비 내역</button>
          <button className={`tab ${activeTab === 'etc' ? 'active' : ''}`} onClick={() => setActiveTab('etc')}>기타정보</button>
        </div>

        {renderTabContent()}

        {activeTab === 'info' && (
  <IonButton expand="full" color="medium" onClick={() => setShowModal(true)}>
    피드백 보내기
  </IonButton>
)}

<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
  <IonContent className="ion-padding">
    <h2>정비소 정보 피드백</h2>
    <IonItem>
      <IonLabel position="stacked">잘못된 정보 또는 수정 요청</IonLabel>

      <IonTextarea
  value={feedbackMsg}
  onInput={(e: any) => setFeedbackMsg(e.target.value)}
  placeholder="예: 위치가 다릅니다. 연락처가 틀렸어요."
/>
    </IonItem>
    <IonButton expand="full" onClick={sendFeedback}>
      피드백 전송
    </IonButton>
    <IonButton expand="full" color="light" onClick={() => setShowModal(false)}>
      닫기
    </IonButton>
  </IonContent>
</IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GarageDetailPage1;