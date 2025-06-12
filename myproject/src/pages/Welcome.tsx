import "../beta_app/Layout.css";
import { CloseButton, Button } from "../beta_app/Buttons";
import { Title, SubTitle } from "../beta_app/Title";
import { VehicleCard } from "../beta_app/VehicleCard";
import { IonContent, IonPage } from "@ionic/react";
import { useIonRouter } from "@ionic/react";


const Welcome:React.FC = () => {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonContent>
                <div className="container">
                    <div style={{width: '100%', height:'64px', display: 'flex'}} > 
                        <CloseButton onClick = {() => router.push('/tabs/home')} />
                    </div>
                    <div className="content" style={{gap: '8px', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                        <Title fontSize = {28}  content={["환영합니다!", "회원가입이 완료되었어요!"].join("\n")} />
                        <SubTitle fontSize = {16} content="쉽고 빠르게 기계장비를 등록할 수 있어요!" />

                        <VehicleCard licensePlate="예) 123가 4567" name="예) 립헬 LTM 1030-2.1" imgSrc="/crane.png" />
                        <Button onClick = {() => router.push('/registermachine') } color="orange" content="기계 등록하기" />
                        
                        <button onClick = {() => router.push('/tabs/home')} style={{backgroundColor: '#F5F5F5', display: 'flex', flexDirection: 'row', justifyContent: 'center', color: '#7A7D7F', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '700', textDecoration: 'underline', wordWrap: 'break-word'}}>
                            다음에 등록하기
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}   

export default Welcome;