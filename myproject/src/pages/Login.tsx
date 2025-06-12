import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react"; // ✅ Ionic 기본 구조만 import
import { login, signUp, logout } from "../services/authService"; // ✅ 로그아웃 함수 추가
import { useHistory } from "react-router-dom";
import { CardButton } from "../beta_app/CardButton";
import "../beta_app/Layout.css"
import { Title } from "../beta_app/Title";
import { Button } from "../beta_app/Buttons";
import { TextInput, CheckBox } from "../beta_app/Input";
import { EmptyGarageCard } from "../beta_app/GarageCard";

const Login: React.FC = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [keepLoggedIn, setKeepLoggedIn] = useState(false);
const history = useHistory();

// 🔹 로그인 함수 (로그인 성공 시 /home 이동)
const handleLogin = async () => {
try {
await login(email, password);
alert("✅ 로그인 성공!");
history.push("/tabs/home"); // ✅ 로그인 성공 후 홈으로 이동
} catch (error) {
alert("❌ 로그인 실패:");
}
};

// 🔹 로그아웃 함수
const handleLogout = async () => {
try {
await logout();
alert("✅ 로그아웃 되었습니다.");
history.push("/login"); // ✅ 로그아웃 후 로그인 페이지로 이동
} catch (error) {
alert("❌ 로그아웃 실패!");
}
};

// 🔹 회원가입 페이지 이동
const goToSignUp = () => {
history.push("/signup");
};


return (
<IonPage>
<IonContent fullscreen>
<div className="container" >
                
                <div style={{flexGrow: 1}}>
                    <div className="header" >   
                        <div style={{paddingLeft: '16px', width: '100%', height:'64px', display: 'flex'}} >    
                        </div>
                        <Title fontSize= {28} content={["간편하게 건설기계장비", "정비를 예약하세요!"].join('\n')} />
                    </div>
                    <div className="content">
                        <div style={{paddingTop: '43px', paddingBottom:'99px', display:'flex', flexDirection:'column', gap: '8px'}}>
                            <Title fontSize={24} content="로그인" />
                            <TextInput size="input-large" placeHolder="이메일을 입력하세요" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                            <TextInput size="input-large" placeHolder="비밀번호를 입력하세요" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                            
                            <CheckBox placeHolder="로그인 유지" 
                            checked={keepLoggedIn}
  onChange={() => setKeepLoggedIn(!keepLoggedIn)}/>
                            <Button onClick= {handleLogin} content="로그인" color= "orange" />
                        </div>
                        
                    </div>
                </div>

<div style={{textAlign: 'center', color: '#7A7D7F', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>뚝닥터가 처음이신가요?</div>
<div className="button-container" style={{flexDirection: 'row', gap: '9px', justifyContent: 'center', paddingTop: '8px'}}>
<CardButton content= "정비사로 가입하기"imgSrc="/wrench.png"
imgStyle={{width: 111, height:111, left: 67, top: 28, position: 'absolute'}}
onClick={() => history.push('/signup2')}/> 

<CardButton content= "이용자로 가입하기"imgSrc="/joystick.png"
imgStyle={{width: 103, height: 103, left: 74, top: 33, position: 'absolute'}}
onClick={() => history.push('/signup')}/> 

</div>
</div>
</IonContent>
</IonPage>
);
};

export default Login;
