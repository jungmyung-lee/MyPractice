import { IonPage, useIonRouter } from "@ionic/react";
import { BackButton, CloseButton, RightArrowButton, Button } from "../beta_app/Buttons";
import { Title, SubTitle } from "../beta_app/Title";
import Stepper from "../beta_app/Stepper";
import { useReserve } from "../ReserveContext"
import "../beta_app/Layout.css";



const Reserve5:React.FC = () => {
    const router = useIonRouter()

    const steps = ["견적 요청중", "견적 수락", "정비 진행중", "정비완료", "결제완료"];
    const currentStatus = 0; // 예: 정비 진행중
    const { data } = useReserve(); // ✅ 예약 정보 접근

    // 예시 데이터 구조
const {
  machineId,
  requestType,
  repairDetail,
  errorCode,
  repairMethod,
  location,
  errorType,
  modelName,
  plateNumber,
  createdAt,
} = data;




    return (
        <IonPage>
            <div className="container">
                <div style={{ width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"space-between"}} > 
                    <BackButton  />
                    <CloseButton onClick={() => router.push('/tabs/home')}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: "center"}}className="content">  
                    <Title fontSize={28} content="견적 요청이 완료되었어요 :)" />
                    <div style={{display: 'flex', flexDirection: 'row', }}>
                        <div style={{textDecoration: 'underline', fontSize: '17px', paddingBottom: '8px', color: 'black', fontFamily: 'Noto Sans KR', fontWeight: '550', wordWrap: 'break-word'}}
                                    onClick = {()=>router.push('/tabs/status')}
                        >
                            현황/내역 
                        </div>
                        <SubTitle fontSize={16} content="에서 받은 견적을 확인할 수 있어요!" />
                    </div>
                    



                    <div style={{display: 'flex', flexDirection: 'column',  borderRadius: '12px', backgroundColor: 'white', padding: '8px', gap: '8px', width: '100%', }} >
                        <div style={{color: '#7A7D7F', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%', wordWrap: 'break-word'}}>
                            {createdAt || "날짜 없음"} 
                        </div>
                        <div style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%',  wordWrap: 'break-word'}}>
                            견적 요청중
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                            <img style={{width: 80, height: 80, borderRadius: 8, border: '0.50px #7A7D7F solid'}} 
                            src="/crane.png" />
                            <div style={{flex: 1}} />

                            <div style={{width: '70%', display: 'flex', flexDirection: 'column', gap: '8px'}}>

                                <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                        {plateNumber}
                                    </span>{' '}
                                    <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                        {modelName}
                                    </span>
                                </div>

                                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                        {repairMethod} 수리-
                                    </span>{' '}
                                    <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                        {location}
                                    </span>
                                </div>

                                <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                        {requestType}-
                                    </span>{' '}
                                    <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                        {errorType}
                                    </span>
                                </div>
                                
                                
                            </div>
                            <div style={{flex: 1}} />
                            
                            <RightArrowButton size={20}/>
                        </div>
                        <Stepper currentStep={currentStatus} steps={steps} />
                    </div>
                </div>

                <div className="button-container">
                    <Button onClick={() => router.push('/tabs/home')} content="완료" color='orange' />
                </div>
            </div>
        </IonPage>
    );
};

export default Reserve5;