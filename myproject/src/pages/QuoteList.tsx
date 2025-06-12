import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "./QuoteList.css";
import { CloseButton, RightArrowButton } from "../beta_app/Buttons"; 
import { IonPage, IonContent, useIonRouter } from "@ionic/react"; 
import "../beta_app/Layout.css"
import { SubTitle, Title } from "../beta_app/Title";
import { DropDown } from "../beta_app/DropDown";
import { QuoteCard } from "../beta_app/QuoteCard";

interface QuoteRequest {
  id: string;
  modelName: string;
  repairDetail: string;
  location: string;
  mediaUrl?: string;
  latitude: number;
  longitude: number;
}

const QuoteList = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const router = useIonRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "QuoteRequests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        modelName: doc.data().modelName || "모델명 없음",
        repairDetail: doc.data().repairDetail || "내용 없음",
        location: doc.data().location || "주소 없음",
        mediaUrl: doc.data().mediaUrl || "",
        latitude: doc.data().latitude || 0,
        longitude: doc.data().longitude || 0,
      }));
      setQuotes(data);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/quotedetail/${id}`);
  };

  return (
    <IonPage> 
      <IonContent> 
        <div className="container">
          <div
            style={{
              width: "100%",
              height: "64px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <CloseButton onClick={() => router.push("/tabs2/home")} />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}className="content">
            <Title fontSize={28} content="견적 보내기 (1/2)" />
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <Title fontSize={24} content="견적 요청 내용" />
              <SubTitle fontSize={20} content="요청된 견적을 선택하여 확인하세요!" />
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <DropDown  size="custom-select-small" options={['거리순'] } />
              <button onClick={() => setShowFilterModal(true)}style={{height: '23px', paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3, background: 'white', overflow: 'hidden', borderRadius: 6, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: 16.80, wordWrap: 'break-word'}}>필터</div>
              </button>
            </div>

            {quotes.map((quote) => (
              <QuoteCard
                id={quote.id}
                modelName={quote.modelName}
                location = {quote.location}
                distance = {3.3}
                repairDetail={quote.repairDetail}
                keywords = {['유압펌프','외장']}
                onClick = {() => handleClick(quote.id)}
                imgSrc = {quote.mediaUrl!}
              />
            
            
          ))
        }
          </div>
        </div>
      
      </IonContent> 
    </IonPage> 
  );
};

export default QuoteList;