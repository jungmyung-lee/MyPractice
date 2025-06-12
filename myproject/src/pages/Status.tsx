import React, { useEffect, useState } from "react";
import { useIonRouter, IonPage, IonContent } from "@ionic/react";
import { Button, CloseButton } from "../beta_app/Buttons";
import "../beta_app/Layout.css";
import { Title } from "../beta_app/Title";
import { DetailedVehicleCard } from "../beta_app/VehicleCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useIonViewWillEnter } from "@ionic/react"; // 추가
import { Beta } from "../beta_app/Beta";

interface Quote {
  id: string;
  start: string;
  imgSrc: string;
  plateNumber: string;
  modelName: string;
  repairMethod: string;
  location: string;
  requestType: string;
  errorType: string;
  quoteCount?: number;
}

const Status: React.FC = () => {
  const router = useIonRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   useIonViewWillEnter(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("❌ 로그인된 사용자 없음");
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    console.log("✅ 로그인된 사용자:", user.uid);
    setIsLoggedIn(true);
    setIsLoading(true);

    try {
      const q = query(
        collection(db, "QuoteRequests"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const results: Quote[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          start: data.start,
          imgSrc: data.imgSrc || "/crane.png",
          plateNumber: data.plateNumber,
          modelName: data.modelName,
          repairMethod: data.repairMethod,
          location: data.location,
          requestType: data.requestType,
          errorType: data.errorType,
          quoteCount: data.quoteCount,
        };
      });
      setQuotes(results);
    } catch (err) {
      console.error("❌ 견적 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  });

  return () => unsubscribe(); // cleanup
});
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "0px 16px" }} className="tab-container">
          <div
            style={{
              width: "100%",
              height: "64px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <CloseButton onClick={() => router.push("/tabs/home")} />
          </div>
            <div className="content">
                {/* 견적 현황 */}
                <div style={{ height: '100%', display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Title fontSize={28} content="견적 현황" />
                  {isLoading ? (
                    <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Beta title="로딩중 ..." content="잠시만 기다려주세요 :)"/>
                    </div>
                  ) : !isLoggedIn ? (
                    <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Beta title="로그인이 필요해요!" content="견적을 확인 하기 위해서는 우선 로그인을 해주세요 :)"/>
                      <Button content="로그인 하기" color='orange' onClick={() => router.push('/login')}/>
                    </div>
                  ) : quotes.length === 0 ? (
                    <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Beta title="요청한 견적이 없어요" content="정비 예약을 통해 견적을 받을 수 있어요 :) "/>
                      <Button content="정비 예약하기" color='orange' onClick={() => router.push('/reserve/step1')}/>
                    </div>
                  ) : (
                    quotes.map((q) => (
                      <DetailedVehicleCard
                        key={q.id}
                        start={q.start}
                        imgSrc={q.imgSrc}
                        plateNumber={q.plateNumber}
                        modelName={q.modelName}
                        repairMethod={q.repairMethod}
                        location={q.location}
                        requestType={q.requestType}
                        errorType={q.errorType}
                        quoteCount={q.quoteCount}
                      />
                    ))
                  )}
                </div>

                {/* 정비 내역 (하드코딩 유지) */}

            </div>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Status;