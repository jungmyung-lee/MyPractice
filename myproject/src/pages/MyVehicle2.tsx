import React, { useEffect, useState } from "react"; 
import "./MyVehicle2.css"; 
import { IonPage, IonContent } from "@ionic/react"; 
import { BackButton, CloseButton } from "../beta_app/Buttons"; 
import { doc, getDoc } from "firebase/firestore"; 
import { db, auth } from "../config/firebaseConfig";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Machine { 
  id: string; 
  plateNumber: string; 
  modelName: string; 
  imageUrl: string; }


const MyVehicle2: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [activeTab, setActiveTab] = useState("제원 정보");
  const history = useHistory();
 

  const tabs = ["제원 정보", "메인터넌스", "정비 내역", "기타정보"];

  const getMachineById = async () => {
    try {
      const docRef = doc(db, "Machines", machineId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMachine({
          id: docSnap.id,
          plateNumber: data.plateNumber,
          modelName: data.modelName,
          imageUrl: data.imageUrl,
        });
      } else {
        alert("기계 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("❌ 기계 불러오기 실패: " + error);
    }
  };

 useEffect(() => {
    getMachineById();
  }, [machineId]);

return ( 
  <IonPage> 
    <IonContent> 
      <div className="vehicle-detail-container"> 
        <div className="vehicle-detail-header"> 
          <BackButton onClick={() => window.history.back()} /> 
          <CloseButton onClick={() => history.push("/tabs/home")} /> 
        </div>

        <div style={{padding: '16px 0px', display: 'flex', gap: '16px'}}>
          <div className="vehicle-title-box"> 
            <p className="plate">{machine?.plateNumber || ""}</p> 
            <p className="desc">{machine?.modelName || ""}</p> 
          </div> 
            {machine?.imageUrl && 
            ( <img
            src={machine.imageUrl}
            alt="기계 이미지"
            className="header-image"
            /> )} 
        </div>

  <div className="tab-bar">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <p></p>
        </div>
      </div>
    </IonContent>
  </IonPage>

); };

export default MyVehicle2;

