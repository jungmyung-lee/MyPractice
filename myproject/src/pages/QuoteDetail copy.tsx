import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "./QuoteDetail.css";
import { BackButton, CloseButton } from "../beta_app/Buttons"; 
import { IonPage, IonContent } from "@ionic/react"; 
import { useHistory } from "react-router-dom";

const QuoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<any>(null);
  const history = useHistory();
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    const ref = doc(db, "QuoteRequests", id || "");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setQuote(snap.data());
    }
  };
  fetchData();

  return () => {
    
  };
}, [id]);

  if (!quote) return <div>로딩 중...</div>;

  return (
    <IonPage> 
      <IonContent> 
      <div className="quote-detail-container">
        
          {/* ✅ Back & Close 버튼 헤더 */}
        <div className="quote-detail-header-buttonss">
          <BackButton onClick={() => window.history.back()} />
          <CloseButton onClick={() => history.push("/tabs/home")} />
        </div>

        {/* 이미지 클릭 영역 */}
        <div className="quote-header">
          <h2>견적 목록 <span>(2/2)</span></h2>
          <div className="machine-summary">
            <img
    src={quote.mediaUrl}
    alt="장비"
    onClick={() => setShowImageModal(true)}
    style={{ cursor: "zoom-in" }}
  />
            <div className="machine-info">
              <div className="model">{quote.modelName}</div>
              <div className="desc">{quote.location}<br />{quote.repairDetail}</div>
            </div>
          </div>
        </div>

  {/* 확대 이미지 모달 */}
        {showImageModal && (
    <div className="image-modal" onClick={() => setShowImageModal(false)}>
      <img src={quote.mediaUrl} alt="확대된 장비" />
    </div>
  )}

        {/* 이하 생략 - 이전 QuoteDetail 디자인 그대로 사용 */}
      </div>
      </IonContent> 
    </IonPage> 
    
  );
};

export default QuoteDetail;

