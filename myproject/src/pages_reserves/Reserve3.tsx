// Reserve3.tsx
import React, { useState } from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useReserve } from "../ReserveContext"
import { SubTitle, Title } from "../beta_app/Title";
import { Button } from "../beta_app/Buttons";
import "../beta_app/Layout.css";
import { useHistory } from "react-router-dom";
import { BackButton, CloseButton } from "../beta_app/Buttons"; // ✅ 이미 있음 또는 확인
import { CustomCheckBox } from "../beta_app/Input";

const Reserve3: React.FC = () => {
  const { setData } = useReserve();
  const router = useIonRouter();
  const [selected, setSelected] = useState<"정비소" | "출장" | null>(null);

  const handleSelect = (type: "정비소" | "출장") => {
    setSelected(type);
    setData({ repairMethod: type });
  };

  const handleNext = () => {
    if (!selected) {
      alert("정비 방법을 선택해주세요.");
      return;
    }
    router.push("/reserve/step4");
  };

  return (
    <IonPage>
      <div className="container">
          <div style={{ width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"space-between"}} > 
              <BackButton  />
              <CloseButton onClick={() => router.push('/tabs/home')}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px' }} className="header">
              <Title fontSize={28} content="정비 예약 (3/4)" />
              <SubTitle fontSize={20} content="정비 방법을 선택해주세요" />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}className="content">
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '13px 16px', width: '100%', height: '64px', borderRadius: '12px', background: 'white'}}>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '4px', color: 'black', fontFamily: 'Noto Sans KR', textAlign: 'left'}}>
                      <div style={{fontSize: '20px', fontWeight: '500', lineHeight: '22px'}}> 정비소 수리 </div>
                      <div style={{fontSize: '14px', fontWeight: '400', lineHeight: '12px'}}>직접 정비소로 오시는 경우</div>
                  </div>
                  <CustomCheckBox onChange={() => handleSelect("정비소")} checked={selected === "정비소" } />
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', padding: '13px 16px', width: '100%', height: '64px', borderRadius: '12px', background: 'white'}}>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '4px', color: 'black', fontFamily: 'Noto Sans KR', textAlign: 'left'}}>
                      <div style={{fontSize: '20px', fontWeight: '500', lineHeight: '22px'}}> 출장 수리 </div>
                      <div style={{fontSize: '14px', fontWeight: '400', lineHeight: '12px'}}>정비사의 방문이 필요한 경우</div>
                  </div>
                  <CustomCheckBox onChange={() => handleSelect("출장")} checked={selected === "출장"} />
              </div>
          </div>

          <div className="button-container">
              <Button onClick={handleNext} content="다음" color={selected? 'orange':  'gray'} />
          </div>
      </div>
    </IonPage>
  );
};

export default Reserve3;