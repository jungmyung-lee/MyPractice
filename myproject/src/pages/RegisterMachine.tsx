import { IonContent, IonImg, IonPage, useIonRouter } from "@ionic/react";
import "../beta_app/Layout.css";
import { Button, CloseButton, UploadButton } from "../beta_app/Buttons";
import { SubTitle, Title } from "../beta_app/Title";
import { TextInput } from "../beta_app/Input";
import { DropDown } from "../beta_app/DropDown";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { uploadImage } from "../services/storageService"; // 여기에 존재한다고 가정
import { auth } from "../config/firebaseConfig";
import { useHistory } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from "@capacitor/core";

const RegisterMachine: React.FC = () => {
  const user = auth.currentUser;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const [plateNumber, setPlateNumber] = useState("");
  const [machineType, setMachineType] = useState("");
  const [modelName, setModelName] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);

  const optionsData = [
    "불도저", "굴착기", "로더", "지게차", "스크레이퍼", "덤프트럭", "기중기", "모터그레이더", "롤러",
  ];

  // 🔹 이미지 업로드 함수
const uploadImage = async (file: string, folder: string = "machine_photos") => {
  try {
    const storage = getStorage();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.jpg`;
    const fileRef = ref(storage, `${folder}/${uniqueFileName}`);
    await uploadString(fileRef, file, 'data_url');
    const downloadUrl = await getDownloadURL(fileRef);
    console.log("✅ 이미지 업로드 성공:", downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("❌ 이미지 업로드 실패:", error);
    return null;
  }
};

/*
// 🔹 파일 선택 핸들러 (이전 handleImageChange 대체)
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    setImageFile(event.target.files[0]);
  }
};
*/
const takePhoto = async () => {
  const isWeb = Capacitor.getPlatform() === 'web';
  
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: isWeb? CameraSource.Photos:  CameraSource.Prompt,
      quality: 90,
    });

    if (photo.dataUrl) {
      setImageFile(photo.dataUrl);
    }
  } catch (error) {
    alert(error);
  }
}


  const addMachine = async () => {
    if (isLoading) return; // ✅ 중복 클릭 방지

    if (!user){
      alert("로그인을 하셔야 등록가능합니다")
      return;
    }
    if (!plateNumber || !machineType || !modelName) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    try {
      setIsLoading(true); // ✅ 로딩 시작
      let imageUrl = "";
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, "machine_photos");
        if (!uploadedUrl) {
          alert("❌ 이미지 업로드에 실패했습니다.");
          setIsLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }
  
      await addDoc(collection(db, "Machines"), {
        plateNumber,
        machineType,
        modelName,
        imageUrl,
        createdAt: new Date(),
        userId: user?.uid,
      });
  
      alert("✅ 기계가 성공적으로 등록되었습니다!");
      history.push("/tabs/myvehicle1");
    } catch (error) {
      console.error("❌ 등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // ✅ 로딩 종료
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="container">
          <div style={{ width: "100%", height: "64px", display: "flex", flexDirection: "row", justifyContent: "end" }}>
            <CloseButton onClick={() => history.push("/tabs/home")} />
          </div>

          <div className="content" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Title content="기계장비 등록" fontSize={28} />
            <SubTitle content="기계종, 번호판 정보로 빠르게 등록할 수 있어요!" fontSize={16} />

            <SubTitle content="번호판을 입력해주세요" fontSize={20} />
            <TextInput size="input-medium" placeHolder="123가 4567" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} />

            <SubTitle content="기계장비를 선택해주세요" fontSize={20} />
            <DropDown placeHolder="선택" options={optionsData} value={machineType} onChange={(e) => setMachineType(e.target.value)} />

            <SubTitle content="모델명을 입력해주세요" fontSize={20} />
            <TextInput size="input-medium" placeHolder="디벨론(Develon) DM03" value={modelName} onChange={(e) => setModelName(e.target.value)} />

            <SubTitle content="기계 사진을 업로드해주세요" fontSize={20} />
            {imageFile && <IonImg src={imageFile} style={{width: "100%", "height": "200px", objectFit: "cover" }} />}
            <UploadButton onClick={takePhoto}/>
            


            <div className="button-container">
  <Button
    content={isLoading ? "로딩중..." : "등록하기"}
    color="gray"
    onClick={addMachine}
    // @ts-ignore: Button 컴포넌트가 disabled 안 받을 경우를 대비
    disabled={isLoading}
  />
</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterMachine;