// Step3.tsx
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useReserve } from "./ReserveContext";
import { Title } from "../beta_app/Title";
import { Button } from "../beta_app/Buttons";
import "./Step3.css";
import "../beta_app/Layout.css";
import { useHistory } from "react-router-dom";
import { BackButton, CloseButton } from "../beta_app/Buttons"; // ✅ 이미 있음 또는 확인

const Step3: React.FC = () => {
  const { setData } = useReserve();
  const history = useHistory();
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
    history.push("/reserve/step4");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <div style={{ padding: "24px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
  <BackButton onClick={() => window.history.back()} />
  <CloseButton onClick={() => history.push("/tabs/home")} />
</div>
            <Title fontSize={24} content="정비 예약 (3/4)" />
            <div className="step3-subtitle">정비 방법을 선택해주세요</div>

            <div className="repair-method-list">
              <button
                className={`repair-method ${selected === "정비소" ? "selected" : ""}`}
                onClick={() => handleSelect("정비소")}
              >
                <div>
                  <div className="repair-title">정비소 수리</div>
                  <div className="repair-desc">직접 정비소로 오시는 경우</div>
                </div>
                <div className={`check-icon ${selected === "정비소" ? "orange" : "gray"}`}>
                  ✓
                </div>
              </button>

              <button
                className={`repair-method ${selected === "출장" ? "selected" : ""}`}
                onClick={() => handleSelect("출장")}
              >
                <div>
                  <div className="repair-title">출장 수리</div>
                  <div className="repair-desc">정비사의 방문이 필요한 경우</div>
                </div>
                <div className={`check-icon ${selected === "출장" ? "orange" : "gray"}`}>
                  ✓
                </div>
              </button>
            </div>
          </div>

          <div style={{ padding: "24px 16px" }}>
            <Button content="다음" color="orange" onClick={handleNext} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Step3;