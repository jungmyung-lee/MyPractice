import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Button } from "../beta_app/Buttons";

const Option: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push("/login");
    } catch (error) {
      alert("❌ 로그아웃 중 오류 발생");
      console.error(error);
    }
  };

  const handleGoLogin = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Setting</h1>

        {user ? (
          <>
            <p>✅ 로그인 중입니다: {user.email}</p>
            <Button content="로그아웃" color="gray" onClick={handleLogout} />
          </>
        ) : (
          <>
            <p>로그아웃 상태입니다. 로그인 화면으로 가시겠습니까?</p>
            <Button content="로그인 하러 가기" color="gray" onClick={handleGoLogin} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Option;