import React, { useState, useEffect } from "react";
import { IonPage, IonContent, useIonRouter, IonImg } from "@ionic/react";
import { useReserve } from "../ReserveContext"
import { SubTitle, Title } from "../beta_app/Title";
import { Button, UploadButton } from "../beta_app/Buttons";
import "./Reserve2.css";
import "../beta_app/Layout.css";
import { useHistory } from "react-router-dom";
import { BackButton, CloseButton } from "../beta_app/Buttons"; // ✅ 이미 있음 또는 확인
import { Accordion } from "../beta_app/Accordion";
import { DropDown } from "../beta_app/DropDown";
import { TextArea, TextInput } from "../beta_app/Input";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { storage, auth } from "../config/firebaseConfig";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import MultiToggleButtonGroup from "../beta_app/MultiToggleButtonGroup";

const Reserve2: React.FC = () => {
  const { setData } = useReserve();
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false); // 🔹 로딩 상태

  const [expandedSection, setExpandedSection] = useState<"외부 수리" | "내부 수리" | null>(null);
  
  const [form, setForm] = useState({
    external: { errorType: [] as string[] , desc: "", code: "", file: null as string | null },
    internal: { errorType: [] as string[], desc: "", code: "", file: null as string | null },
  });


  const [interiorImageFile, setInteriorImageFile] = useState<string | null>(null);
  const [exteriorImageFile, setExteriorImageFile] = useState<string | null>(null);

  const interiorFailureTypes = ['전자 배선', '내장재 손상', '공조 장치', '조작부 손상'];
  const exteriorFailureTypes = ['외장 손상', '유압 시스템', '타이어', '엔진, 변속기']
  
  const uploadBase64ToStorage = async (base64: string, path: string) => {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64, 'data_url');
  return await getDownloadURL(storageRef);
};

  const takePhoto = async (isInternal: boolean) => {
    const isWeb = Capacitor.getPlatform() === 'web';

    console.log('isWeb?: ', isWeb);
    
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: isWeb? CameraSource.Photos:  CameraSource.Prompt,
        quality: 90,
      });

      if (photo.dataUrl) {
        if (isInternal)
          setInteriorImageFile(photo.dataUrl);
        else
          setExteriorImageFile(photo.dataUrl);
      }
    } catch (error) {
      alert(error);
    }
  }

  const toggleSection = (section: "외부 수리" | "내부 수리") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleChange = (
    field: "errorType" | "desc" | "code",
    value: string,
    isInternal: boolean
  ) => {
    if(field === "errorType"){
      setForm((prev) => ({
        ...prev,
        [isInternal ? "internal" : "external"]: {
          ...prev[isInternal ? "internal" : "external"],
          [field]:  prev[isInternal ? "internal" : "external"]['errorType'].includes(value)
                    ? prev[isInternal ? "internal" : "external"]['errorType'].filter((item) => item !== value) // 선택 해제
                    : [...prev[isInternal ? "internal" : "external"]['errorType'], value]                      // 선택 추가,
        },
      }));
    }
    else{
      setForm((prev) => ({
        ...prev,
        [isInternal ? "internal" : "external"]: {
          ...prev[isInternal ? "internal" : "external"],
          [field]: value,
        },
      }));
    }
  };

  const handleFile = (dataUrl: string | null, isInternal: boolean) => {
    setForm((prev) => ({
      ...prev,
      [isInternal ? "internal" : "external"]: {
        ...prev[isInternal ? "internal" : "external"],
        file: dataUrl,
      },
    }));
  };

  const handleNext = async () => {
  if (isLoading) return; // 🔹 중복 클릭 방지
  if (!expandedSection) return alert("요청 사항을 선택해주세요");

  if (isFormComplete()) {
    const isInternal = expandedSection === "내부 수리";
    const data = form[isInternal ? "internal" : "external"];

    try {
      setIsLoading(true); // 🔹 로딩 시작
      const uid = auth.currentUser?.uid ?? "anonymous";
      const timestamp = Date.now();
      const path = `reserveImages/${uid}_${timestamp}.jpg`;

      const downloadUrl = await uploadBase64ToStorage(data.file!, path);

      setData({
        requestType: expandedSection,
        repairDetail: data.desc,
        errorCode: data.code,
        repairMethod: "정비소",
        errorType: data.errorType,
        mediaUrl: downloadUrl,
      });

      router.push("/reserve/step3");
    } catch (err) {
      console.error("❌ Storage 업로드 실패", err);
      alert("사진 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 🔹 로딩 종료
    }
  } else {
    alert("입력 폼을 완성해주세요");
  }
};

  const isFormComplete = () => {
    if (!expandedSection) return false;

    const data = form[expandedSection === "내부 수리" ? "internal" : "external"];
    return data.errorType.length > 0 && data.desc !== "" && data.file !== null;
  }

  const renderDetailForm = (isInternal: boolean) => {
    const sectionData = form[isInternal ? "internal" : "external"];
    const imageFile = isInternal? interiorImageFile : exteriorImageFile
    
    return (
      <div style={{color: 'white', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word', display: 'flex', flexDirection: 'column', gap: '4px'}}>
          고장 유형을 선택해 주세요
          
          {/*
          <DropDown placeHolder="선택해주세요" 
          options={isInternal? interiorFailureTypes: exteriorFailureTypes} 
          value={sectionData.errorType}
          onChange={(e) => handleChange("errorType", e.target.value, isInternal)}
          />
          */}

          <MultiToggleButtonGroup
            options = {isInternal? interiorFailureTypes: exteriorFailureTypes}
            selected={sectionData.errorType}
            onChange={(option:string) => handleChange('errorType', option, isInternal)}
          />
            

          발생한 문제에 대해 적어주세요
          <TextArea placeHolder="자세하게 적을수록 좋아요!" size="96px" 
          value={sectionData.desc} onChange={(e) => handleChange("desc", e.target.value, isInternal)}
          />

          사진, 영상을 첨부해주세요
          <div style={{display: 'flex',flexDirection:'row', gap: '4px'}}>
            {imageFile && <IonImg src={imageFile} style={{ width: "80px", "height": "80px", objectFit: "cover" }} />}
            <UploadButton onClick={() => takePhoto(isInternal)}/>
          </div>

          오류코드를 입력해주세요(선택)
          <div style={{display: 'flex', gap: '4px', alignItems: 'center',  color: 'white', fontSize: 12, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>
              오류코드란
              <svg  xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 3.5V5.5M5.5 7.5H5.505M10 5.5C10 7.9853 7.9853 10 5.5 10C3.01472 10 1 7.9853 1 5.5C1 3.01472 3.01472 1 5.5 1C7.9853 1 10 3.01472 10 5.5Z" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
          <TextInput placeHolder="예시) P0300/ MID 144 PSID 247 FMI 7" size='input-medium' 
          value={sectionData.code}
          onChange={(e) => handleChange("code", e.target.value, isInternal)}
          />
      </div>
    );
  };

  useEffect(() => {
    if (interiorImageFile) {
      handleFile(interiorImageFile, true);
    }
  }, [interiorImageFile]);

  useEffect(() => {
    if (exteriorImageFile) {
      handleFile(exteriorImageFile, false);
    }
  }, [exteriorImageFile]);


  return (
    <IonPage>
          <div className="tab-container" >
              <div style={{padding: '0px 16px', width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"space-between"}} > 
                  <BackButton  />
                  <CloseButton onClick={() => router.push('/tabs/home')}/>
              </div>

              <div style={{padding: '0px 16px',display: 'flex', flexDirection: 'column', gap: '8px' }} className="header">
                  <Title fontSize={28} content="정비 예약 (2/4)" />
                  <SubTitle fontSize={20} content="요청 사항을 선택해주세요" />
              </div>

              <div className="content">
                  <IonContent>
                      <div style={{padding: '0px 16px', display: 'flex', flexDirection: 'column', gap: '8px'}} >
                          <Accordion title="외부 수리"
                          isOpen= {expandedSection === "외부 수리"} 
                          onClick={() => toggleSection("외부 수리")} >
                              {renderDetailForm(false)}
                          </Accordion>

                          <Accordion title="내부 수리" 
                          isOpen= {expandedSection === "내부 수리"}
                          onClick={() => toggleSection("내부 수리")} 
                          >
                              {renderDetailForm(true)}
                          </Accordion>
                      </div>
                  </IonContent>
              </div>

              <div style={{padding: '0px 16px' }}className="button-container" >
                  <Button
  onClick={handleNext}
  content={isLoading ? "로딩중..." : "다음"}
  color={isFormComplete() ? "orange" : "gray"}
  // @ts-ignore
  disabled={isLoading}
/>
              </div>
          </div>
      </IonPage>
  );
};

export default Reserve2;