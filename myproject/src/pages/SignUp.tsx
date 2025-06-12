import { IonContent, IonPage, IonButton, IonModal, useIonRouter, IonToast} from "@ionic/react";
import React, { useState } from 'react';
import { Title, SubTitle } from "../beta_app/Title";
import { RightArrowButton, Button, BackButton } from "../beta_app/Buttons";
import { TextInput, CheckBox } from "../beta_app/Input";
import "../beta_app/Layout.css";
import { signUp } from "../services/authService"; // 회원가입 함수 import
import { addUser } from "../services/userService"; // 유저 정보 추가 함수 import

const SignUp: React.FC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);
    const [agreeAll, setAgreeAll] = useState(false);
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);
    const [agree3, setAgree3] = useState(false);

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const router = useIonRouter();

    // 모달 상태 추가
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showEmailSmsModal, setShowEmailSmsModal] = useState(false);

   // 모달 열기/닫기 함수
   const toggleTermsModal = () => setShowTermsModal(!showTermsModal);
   const togglePrivacyModal = () => setShowPrivacyModal(!showPrivacyModal);
   const toggleEmailSmsModal = () => setShowEmailSmsModal(!showEmailSmsModal);

  // 🔹 회원가입 함수 (회원가입 후 /home 이동)
const handleSignUp = async () => {
    
    if (!email.includes("@") || email.length < 6) {
    alert("❌ 올바른 이메일을 입력하세요. 정상적인 email 형식이 아니거나 6자 이상이어야 합니다.");
    return;
    }
    
    if (pw.length < 6) {
    alert("❌ 비밀번호는 최소 6자 이상이어야 합니다.");
    return;
    }
    
    if (name.trim().length < 2) {
    alert("❌ 이름은 최소 2자 이상이어야 합니다.");
    return;
    }

    if (!agree1 || !agree2){
      alert("필수 동의가 필요합니다");
      return;
    }

    if (pw !== pwCheck) {
      alert("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }
    
    try {
    const user = await signUp(email, pw);
    console.log("✅ 회원가입 성공! 사용자:", user);
    
    // 🔹 Firestore에 사용자 정보 추가
    if (user) {
    await addUser(user.uid, name, "driver", "");
    }
    
    handleToast("회원가입이 성공적으로 되었습니다!")
    //alert("✅ 회원가입 성공!");
    router.push("/welcome"); // 회원가입 성공 후 홈으로 이동
    } catch (error: any) {
    console.error("❌ 회원가입 실패:", error);
    handleToast("회원가입에 실패했습니다.")
    //alert(`❌ 회원가입 실패: ${error.message}`);
    }
    };

  const handleToast = (msg: string) =>{
    setToastMessage(msg);
    setIsToastOpen(true);
  }

  return (
    <IonPage>
      <IonContent>
          <div className="container" >
            <div style={{width: '100%', height:'64px', display: 'flex'}} > 
                <BackButton onClick={() => router.goBack()}/>
            </div>
            <div style={{flexGrow: 1}}>
              <div className="header" >
                  <Title fontSize={28} content="회원가입" />
              </div>
              <div className="content">
                <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
                    <SubTitle fontSize={20} content="이름" />  
                    <TextInput size="input-medium" placeHolder="이름을 입력해주세요." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}/> 
                </div>

                <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
                    <SubTitle fontSize={20} content="이메일 주소" />  
                    <TextInput size="input-medium" placeHolder="ID@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}/> 
                </div>

                {/* 비밀번호 입력 */}
                <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
                    <SubTitle fontSize={20} content="비밀번호" />  
                    <TextInput size="input-medium" placeHolder="비밀번호" 
                    value={pw} onChange={(e) => setPw(e.target.value)}
                    type={showPw ? "text" : "password"}/> 
                    <CheckBox placeHolder="비밀번호 보기" 
                    checked={showPw}
                    onChange={() => setShowPw(!showPw)}/>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
                    <SubTitle fontSize={20} content="비밀번호 확인" />  
                    <TextInput size="input-medium" placeHolder="비밀번호 확인"
                    value={pwCheck}
                    onChange={(e) => setPwCheck(e.target.value)}
                    type={showPwCheck ? "text" : "password"}/>  
                    <CheckBox placeHolder="비밀번호 보기" checked={showPwCheck}
                    onChange={() => setShowPwCheck(!showPwCheck)}/>
                </div>

                <div style={{paddingTop: '8px', paddingBottom: '8px'}}>
                    <SubTitle fontSize={20} content="약관동의" />  
                    <div style={{width: '100%', borderRadius: '8px', background: '#FFF', flexShrink:0, padding:'12px'}}>
                      <CheckBox placeHolder="전체 동의" checked={agreeAll} onChange={() => {
                            const checked = !agreeAll;
                            setAgreeAll(checked);
                            setAgree1(checked);
                            setAgree2(checked);
                            setAgree3(checked);}} />
                      <div style={{paddingLeft: '7px'}}>
                        <div style={{display:"flex", flexDirection:"row", alignItems: 'center', justifyContent: 'space-between'}}>
                          <CheckBox placeHolder="이용 약관 동의(필수)" checked={agree1} 
                          onChange={() => setAgree1(!agree1)} />

                          <RightArrowButton onClick={toggleTermsModal} />
                        </div>
                        <div style={{display:"flex", flexDirection:"row", alignItems: 'center', justifyContent: 'space-between'}}>
                          <CheckBox placeHolder="개인정보 수집 및 이용동의(필수)" checked={agree2}
                          onChange={() => setAgree2(!agree2)} />
                          <RightArrowButton onClick={togglePrivacyModal} />
                        </div>
                        <div style={{display:"flex", flexDirection:"row", alignItems: 'center', justifyContent: 'space-between'}}>
                          <CheckBox placeHolder="E-mail 및 SMS 광고성 정보 수신 동의(선택)" checked={agree3}
                          onChange={() => setAgree3(!agree3)}/>
                          <RightArrowButton onClick={toggleEmailSmsModal} />
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>


            <IonModal isOpen={showTermsModal}>
  
    <div style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
      <h2>이용 약관</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        <strong>서비스 이용약관 (필수)</strong>
        <br />
        제1조(목적) 이 약관은 [뚝딱고]가 제공하는 건설기계정비 견적 매칭 플랫폼 서비스의 이용 조건 및 절차, 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        <br />
        제2조(회원의 정의) "회원"이란 이 약관에 동의하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
        <br />
        제3조(서비스 내용) 회사는 회원에게 건설기계장비정비 견적 비교 및 정비업체 매칭 서비스를 제공합니다.
        <br />
        제4조(회원의 의무)
        <ul>
          <li>회원은 허위 정보를 제공하지 않습니다.</li>
          <li>회원은 서비스 이용 시 관련 법령과 본 약관을 준수해야 합니다.</li>
          <li>회원은 타인의 권리를 침해하거나 부당한 목적으로 서비스를 이용할 수 없습니다.</li>
        </ul>
        제5조(계약 해지 및 서비스 이용제한) 회원이 본 약관을 위반할 경우, 회사는 사전 통지 후 또는 긴급한 경우에는 즉시 서비스 이용을 제한하거나 회원 자격을 박탈할 수 있습니다.
      </p>
      <IonButton onClick={toggleTermsModal}>닫기</IonButton>
    </div>
  
</IonModal>

<IonModal isOpen={showPrivacyModal}>
  
    <div style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
      <h2>개인정보 수집 및 이용 동의</h2>
      
      <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        <strong>개인정보 수집 및 이용 동의 (필수)</strong>
        <br />
        <strong>수집 항목</strong>
        <ul>
          <li>필수: 이름, 휴대폰 번호, 이메일, 사업자등록번호(업체회원의 경우), 차량정보</li>
          <li>선택: 사진, 정비 이력</li>
        </ul>

        <strong>수집 및 이용 목적</strong>
        <ul>
          <li>견적 요청 및 매칭 서비스 제공</li>
          <li>회원 관리 및 서비스 이용 안내</li>
          <li>서비스 관련 상담 및 민원 처리</li>
        </ul>

        <strong>보유 및 이용 기간</strong>
        <ul>
          <li>회원 탈퇴 또는 목적 달성 시까지 (단, 관계 법령에 따라 보존 필요 시 해당 기간까지)</li>
        </ul>

        <br />
        <strong>개인정보 제3자 제공 동의 (필수)</strong>
        <br />
        <strong>제공받는 자</strong>
        <ul>
          <li>정비업체, 플랫폼 제휴사</li>
        </ul>

        <strong>제공 항목</strong>
        <ul>
          <li>이름, 연락처, 차량정보, 견적 요청 내용</li>
        </ul>

        <strong>이용 목적</strong>
        <ul>
          <li>견적 제공 및 정비업체 매칭 서비스 제공</li>
        </ul>

        <strong>보유 및 이용 기간</strong>
        <ul>
          <li>제공 목적 달성 후 즉시 파기</li>
        </ul>
      </p>

      <IonButton onClick={togglePrivacyModal}>닫기</IonButton>
    </div>
  
</IonModal>

<IonModal isOpen={showEmailSmsModal}>
  
    <div style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
      <h2>E-mail 및 SMS 광고성 정보 수신 동의</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        <strong>마케팅 정보 수신 동의 (선택)</strong>
        <br />
        <p>
          회사는 서비스 및 이벤트 안내, 프로모션, 광고성 정보 등을 회원에게 제공할 수 있습니다.
        </p>
        
        <strong>수신 방법</strong>
        <ul>
          <li>문자</li>
          <li>이메일</li>
          <li>앱 푸시</li>
        </ul>
        
        <strong>동의 거부 권리</strong>
        <ul>
          <li>회원은 마케팅 정보 수신을 거부할 수 있으며, 거부 후에도 서비스 이용은 가능합니다.</li>
        </ul>
      </p>
      <IonButton  onClick={toggleEmailSmsModal}>닫기</IonButton>
    </div>
  
</IonModal>

<IonToast
  message={toastMessage}
  isOpen={isToastOpen}
  swipeGesture="vertical"
  position="bottom"
  onDidDismiss={() => setIsToastOpen(false)}
  duration={3000}>

</IonToast>



            <div className="button-container">
                <Button content="이용자로 가입하기" color="gray" onClick= {handleSignUp}/>
            </div>
            </div>
      </IonContent>
    </IonPage>
    );
};

export default SignUp;
