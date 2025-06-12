import React, { useEffect, useState } from "react";
import "./MyVehicle1.css";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { CloseButton } from "../beta_app/Buttons";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import { VehicleCard } from "../beta_app/VehicleCard";
import "../beta_app/Layout.css";
import { Title, SubTitle } from "../beta_app/Title";
import { NewCardbutton } from "../beta_app/CardButton";
import { IonAlert } from "@ionic/react";

interface Machine {
  id: string;
  plateNumber: string;
  modelName: string;
  imageUrl: string;
}

const MyVehicle1: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const router = useIonRouter();
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedMachineIds, setSelectedMachineIds] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleNewMachine = () => {
    if (user) {
      router.push("/registermachine");
    } else {
      alert("기계등록을 하기 위해서는 로그인을 먼저 해주세요.");
      router.push("/login");
    }
  };

  const toggleMachineSelection = (id: string) => {
    setSelectedMachineIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteMachines = async () => {
    try {
      await Promise.all(
        selectedMachineIds.map((id) => deleteDoc(doc(db, "Machines", id)))
      );
      setShowConfirm(false);
      setSelectedMachineIds([]);
      alert("✅ 선택한 기계가 삭제되었습니다.");
    } catch (err) {
      console.error("❌ 삭제 오류:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribeAuth();
  }, []);

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

  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "0px 16px" }} className="tab-container">
          <div style={{ width: "100%", height: "64px", display: "flex", flexDirection: "row", justifyContent: "end" }}>
            <CloseButton onClick={() => router.push("/tabs/home")} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
            <Title fontSize={28} content="MY 기계" />
            <div style={{ display: 'flex', gap: '8px' }}>
              {deleteMode && selectedMachineIds.length > 0 && (
                <button
                  onClick={() => setShowConfirm(true)}
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  선택한 {selectedMachineIds.length}개 기계 삭제
                </button>
              )}
              <button
                onClick={() => {
                  setDeleteMode((prev) => !prev);
                  setSelectedMachineIds([]);
                }}
                style={{
                  backgroundColor: deleteMode ? "#ccc" : "#ff4d4f",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {deleteMode ? "삭제 취소" : "삭제"}
              </button>
            </div>
          </div>

          <SubTitle fontSize={20} content="기계를 선택해서 관리해요!" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className="content">
            {machines.map((machine) => (
              <VehicleCard
                key={machine.id}
                imgSrc={machine.imageUrl}
                licensePlate={machine.plateNumber}
                name={machine.modelName}
                type={deleteMode ? 'checkBox' : 'rightArrow'}
                checked={selectedMachineIds.includes(machine.id)}
                onChange={() => toggleMachineSelection(machine.id)}
                onClick={() => {
                  if (!deleteMode) {
                    router.push(`/myvehicle2/${machine.id}`);
                  }
                }}
              />
            ))}

            <NewCardbutton onClick={handleNewMachine} />

            <IonAlert
  isOpen={showConfirm}
  onDidDismiss={() => setShowConfirm(false)}
  header="삭제 확인"
  message={`선택한 ${selectedMachineIds.length}개 기계를 삭제하시겠습니까?`}
  buttons={[
    {
      text: "취소",
      role: "cancel",
      handler: () => setShowConfirm(false),
    },
    {
      text: "삭제",
      role: "destructive",
      handler: deleteMachines,
    },
  ]}
/>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyVehicle1;