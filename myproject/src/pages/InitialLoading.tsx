import { IonPage } from "@ionic/react";
import "../beta_app/Layout.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./InitialLoading.css";

export const InitialLoading:React.FC = () => {
    const history = useHistory();
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 750);

        const navTimer = setTimeout(() => {
            history.replace('/tabs/home');
        }, 1250);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(navTimer);
        }
    }, [history]);

    return (
        <IonPage>
            <div className={`splash-content ${fadeOut ? 'fade-out' : ''}`}
             style={{width: '100%', height: '100%', background: '#FFFFFF'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px', transform: 'translate(-50%, -50%)',position: 'absolute', top: '45%', left: '50%'}}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 104 104" fill="none">
                        <path d="M40.7008 3.00889C41.0584 1.25773 42.5988 0 44.3861 0H59.6963C61.4836 0 63.024 1.25773 63.3816 3.00889L81.3115 90.829C81.7875 93.1606 80.0059 95.3427 77.6262 95.3427H26.4562C24.0765 95.3427 22.2949 93.1606 22.7709 90.8289L40.7008 3.00889Z" fill="#FF6F1E"/>
                        <path d="M0 93.2803C0 92.2416 0.841996 91.3996 1.88065 91.3996H102.119C103.158 91.3996 104 92.2416 104 93.2803V102.119C104 103.158 103.158 104 102.119 104H1.88065C0.841993 104 0 103.158 0 102.119V93.2803Z" fill="#FF6F1E"/>
                        <path d="M23.5081 57.1718H80.4919V75.9783H23.5081V57.1718Z" fill="white"/>
                        <path d="M23.5081 18.8065H80.4919V33.8517H23.5081V18.8065Z" fill="white"/>
                    </svg>
                    <div style={{textAlign: 'center', color: 'black', fontSize: 28, fontFamily: 'Noto Sans KR', fontWeight: '700', letterSpacing: 1.50, wordWrap: 'break-word'}}>뚝닥터</div>
                </div>
            </div>
        </IonPage>
    );
};