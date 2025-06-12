// Settings.tsx
import { IonPage, useIonRouter } from "@ionic/react";
import "../beta_app/Layout.css";
import { CloseButton } from "../beta_app/Buttons";
import { Beta } from "../beta_app/Beta";

const Settings: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <div className="container">
        <div style={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'end' }}>
          <CloseButton onClick={() => router.push('/tabs2/home')} />
        </div>
        <div className="content" style={{ gap: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Beta />
        </div>
      </div>
    </IonPage>
  );
};
export default Settings;