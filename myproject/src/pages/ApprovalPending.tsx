import { IonPage, useIonRouter } from "@ionic/react";
import "./ApprovalPending.css";
import "../beta_app/Layout.css";
import { CloseButton } from "../beta_app/Buttons";
import { Beta } from "../beta_app/Beta";

const ApprovalPending: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <div className="container">
        {/* 상단 닫기 버튼 */}
        <div style={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'end' }}>
          <CloseButton onClick={() => router.push('/tabs2/home')} />
        </div>

        {/* 중앙 내용 */}

        <Beta title={["신청이 완료되었어요 :)", "승인되면 알림드릴께요!"]}
              content="2-3일 정도 소요될 수 있어요!" />
      </div>
    </IonPage>
  );
};

export default ApprovalPending;
