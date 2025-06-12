import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import "../beta_app/Layout.css"
import { CloseButton } from "../beta_app/Buttons";
import { Beta } from "../beta_app/Beta";


const ThisisBeta:React.FC = () =>{
    const router = useIonRouter();
    return (
        <IonPage>
           <IonContent>
                <div className="container">
                    <div style={{width: '100%', height:'64px', display: 'flex', justifyContent: 'end' }} > 
                        <CloseButton onClick = {() => router.push('/tabs/home')} />
                    </div>
                        
                        <div className="content" style={{gap: '8px', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                            <Beta />
                        </div>
                    
                </div>
            </IonContent>
        </IonPage>
    )
}

export default ThisisBeta;