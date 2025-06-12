import React, {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "./QuoteDetail.css";
import { BackButton, Button, CloseButton } from "../beta_app/Buttons"; 
import { IonPage, IonContent, useIonRouter } from "@ionic/react"; 
import { useHistory } from "react-router-dom";
import "../beta_app/Layout.css"
import { SubTitle, Title } from "../beta_app/Title";
import { ExpandableQuoteCard, QuoteCard } from "../beta_app/QuoteCard";
import { TextArea, TextInput } from "../beta_app/Input";
import { setPersistence } from "firebase/auth";

const QuoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<any>(null);
  const router = useIonRouter();
  const [showImageModal, setShowImageModal] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [quoteCost, setQuoteCost] = useState<number>(0);
  const [quoteDetail, setQuoteDetail] = useState<string>("");
  const [ETA_hour, setETA_hour] = useState<number>(0);
  const [ETA_day, setETA_day] = useState<number>(0);

  const revertOpen = () => {
    setIsOpen(isOpen ? false: true);
  }

  const handleCost = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); 
    const numericValue = Number(rawValue);

    setQuoteCost(numericValue); 
  }

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
        <div className="container">
          {/* ✅ Back & Close 버튼 헤더 */}
          <div
            style={{
              width: "100%",
              height: "64px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <BackButton onClick={() => router.goBack()} />
            <CloseButton onClick={() => router.push("/tabs2/home")} />
          </div>
          {/*body */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}className="content">
            <Title fontSize={28} content="견적 보내기 (2/2)" />

            <ExpandableQuoteCard
                id={quote.id}
                modelName={quote.modelName}
                location = {quote.location}
                distance = {3.3}
                repairDetail={quote.repairDetail}
                keywords = {['유압펌프','외장']}
                onClick = {revertOpen}
                imgSrc = {quote.mediaUrl!}
                isOpen = {isOpen}
                errorCode = {quote.errorCode}
                imgOnClick={() => setShowImageModal(true)}
            />

            <div style={{position: "relative"}}>
              <SubTitle content={"정비 금액"} fontSize={20} />
              <input className ="input-won" placeholder="0" value={quoteCost.toLocaleString()} onChange={handleCost} />
              <span style={{ position: "absolute", right: "20px", top: '40px' }}>원</span>
            </div>

            <div>
              <SubTitle content={"견적 설명"} fontSize={20} />
              <TextArea placeHolder="구체적인 견적을 자세하게 적어주세요!" size='150px' value={quoteDetail} onChange={(e) => setQuoteDetail(e.target.value)} />
            </div>

            <div>
              <SubTitle content={"소요 시간"} fontSize={20} />

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{position: 'relative', paddingRight: '30px'}}>
                  <TextInput placeHolder="0" size='input-medium' value={ETA_day} onChange={(e) => setETA_day(Number(e.target.value))} />
                  <span style={{ position: "absolute", right: "10px", top: '5px' }}>일</span>
                </div>
                <div style={{position: 'relative', paddingRight: '45px'}}>
                  <TextInput placeHolder="0" size='input-medium' value={ETA_hour} onChange={(e) => setETA_hour(Number(e.target.value))} />
                    <span style={{ position: "absolute", right: "10px", top: '5px' }}>시간</span>
                </div>
              </div>

            </div>
            
          </div>
          
          <div style={{paddingTop: '16px'}}className="button-container">
           <Button content="견적 보내기" color='orange' onClick={() => {router.push('/quotesentsuccess')}} />
          </div>
        </div>

        {/* 확대 이미지 모달 */}
              {showImageModal && (
          <div className="image-modal" onClick={() => setShowImageModal(false)}>
            <img src={quote.mediaUrl} alt="확대된 장비" />
          </div>
        )}

      </IonContent> 
    </IonPage> 
    
  );
};

export default QuoteDetail;

