import React from "react";
import { useHistory } from "react-router-dom";
import { IonPage } from "@ionic/react";
import "./ApprovalSuccess.css";
import "../beta_app/Layout.css";
import { BackButton, CloseButton, Button } from "../beta_app/Buttons";
import { Beta } from "../beta_app/Beta";

const ApprovalSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <div className="container">
        {/* 상단 */}
        <div
          style={{
            width: "100%",
            height: "64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BackButton onClick={() => window.history.back()} />
          <CloseButton onClick={() => history.push("/tabs2/home")} />
        </div>

        {/* 중앙 본문 */}
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Beta title="정비소 가입이 승인되었어요 :)" content={['MY정비소에서 정보를 수정/작성해보세요!','간단한 정보는 뚝닥터가 작성을 해놓았어요 :)']} />

        </div>

        {/* 하단 버튼 */}
          <div className="approval-success-footer">
            <Button
              content="완료"
              color="orange"
              onClick={() => history.push("/tabs2/home")}
            />
          </div>
      </div>
    </IonPage>
  );
};

export default ApprovalSuccess;
