// Reserve1.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useReserve } from "../ReserveContext"
import { SubTitle, Title } from "../beta_app/Title";
import { Button } from "../beta_app/Buttons";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import "../beta_app/Layout.css";
import "./Reserve1.css";
import { CloseButton } from "../beta_app/Buttons"; // ✅ 이미 있음 또는 확인
import { VehicleCard } from "../beta_app/VehicleCard";
import { NewCardbutton } from "../beta_app/CardButton";
import { useHistory } from "react-router-dom";

interface Machine {
  id: string;
  plateNumber: string;
  modelName: string;
  imageUrl: string;
}

const Reserve1: React.FC = () => {
  const { setData } = useReserve();
  const router = useIonRouter();
  const history = useHistory();

  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  // 인증 상태 감지
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Machines 컬렉션에서 현재 유저의 장비 불러오기
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "Machines"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMachines: Machine[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          plateNumber: data.plateNumber,
          modelName: data.modelName,
          imageUrl: data.imageUrl,
        };
      });
      setMachines(updatedMachines);
    });
    return () => unsubscribe();
  }, [user]);

  const handleSelect = (id: string) => {
  setSelectedId(id);
  const selectedMachine = machines.find((m) => m.id === id);
  if (selectedMachine) {
    setData({
      machineId: selectedMachine.id,
      plateNumber: selectedMachine.plateNumber,
      modelName: selectedMachine.modelName,
    });
  }
};


  const handleNext = () => {
    if (selectedId) {
      router.push("/reserve/step2");
    } else {
      alert("장비를 선택해주세요.");
    }
  };

  return (
    <IonPage>
    <IonContent fullscreen>
      <div className="container">
          <div style={{width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"end"}} > 
              <CloseButton onClick={() => router.push('/tabs/home')}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px' }} className="header">
              <Title fontSize={28} content="정비 예약 (1/4)" />
              <SubTitle fontSize={20} content="정비가 필요한 장비를 선택해주세요" />
          </div>

          <div className="content">
              <div className="card-button-container" style={{display: 'flex', flexDirection: 'column', gap: '8px'}} >
                  {
                    machines.map((machine) => (
                      <VehicleCard 
                        key = {machine.id}
                        checked = {selectedId === machine.id}
                        imgSrc={machine.imageUrl}
                        licensePlate={machine.plateNumber}
                        name={machine.modelName}
                        onChange={() => handleSelect(machine.id)}
                        type='checkBox'
                      />
                    ))
                  }
                  
                  <NewCardbutton onClick={() => history.push("/registermachine")} />

              </div>
          </div>

          <div className="button-container">
              <Button onClick={handleNext} content="다음" color={selectedId ? 'orange': 'gray'} />
              
          </div>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Reserve1;