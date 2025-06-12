import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useReserve } from "./ReserveContext";
import { Title } from "../beta_app/Title";
import { Button } from "../beta_app/Buttons";
import "./Step2.css";
import "../beta_app/Layout.css";
import { useHistory } from "react-router-dom";
import { BackButton, CloseButton } from "../beta_app/Buttons"; // ✅ 이미 있음 또는 확인

const Step2: React.FC = () => {
  const { setData } = useReserve();
  const history = useHistory();

  const [expandedSection, setExpandedSection] = useState<"외부 수리" | "내부 수리" | null>(null);
  const [form, setForm] = useState({
    external: { errorType: "", desc: "", code: "", file: null as File | null },
    internal: { errorType: "", desc: "", code: "", file: null as File | null },
  });

  const toggleSection = (section: "외부 수리" | "내부 수리") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleChange = (
    field: "errorType" | "desc" | "code",
    value: string,
    isInternal: boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [isInternal ? "internal" : "external"]: {
        ...prev[isInternal ? "internal" : "external"],
        [field]: value,
      },
    }));
  };

  const handleFile = (file: File | null, isInternal: boolean) => {
    setForm((prev) => ({
      ...prev,
      [isInternal ? "internal" : "external"]: {
        ...prev[isInternal ? "internal" : "external"],
        file,
      },
    }));
  };

  const handleNext = () => {
    if (!expandedSection) return alert("요청 사항을 선택해주세요");

    const data = form[expandedSection === "내부 수리" ? "internal" : "external"];
    setData({
      requestType: expandedSection,
      repairDetail: data.desc,
      errorCode: data.code,
      repairMethod: "정비소",
    });
    history.push("/reserve/step3");
  };

  const renderDetailForm = (isInternal: boolean) => {
    const sectionData = form[isInternal ? "internal" : "external"];
    return (
      <div className="detail-box">
        <label>고장 유형을 선택해 주세요</label>
        <input
          className="input"
          placeholder="선택해주세요"
          value={sectionData.errorType}
          onChange={(e) => handleChange("errorType", e.target.value, isInternal)}
        />
        <label>발생한 문제에 대해 적어주세요</label>
        <textarea
          className="textarea"
          placeholder="자세하게 적을수록 좋아요!"
          value={sectionData.desc}
          onChange={(e) => handleChange("desc", e.target.value, isInternal)}
        />
        <label>사진, 영상을 첨부해주세요</label>
        <input
          type="file"
          onChange={(e) =>
            handleFile(e.target.files ? e.target.files[0] : null, isInternal)
          }
        />
        <label>
          오류코드를 입력해주세요 (선택)
          <span className="code-hint">
            오류코드란 <span title="예시: P0300 / MID 144 PSID 247 FMI 7">ⓘ</span>
          </span>
        </label>
        <input
          className="input"
          placeholder="예시) P0300 / MID 144 PSID 247 FMI 7"
          value={sectionData.code}
          onChange={(e) => handleChange("code", e.target.value, isInternal)}
        />
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <div style={{ padding: "24px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
  <BackButton onClick={() => window.history.back()} />
  <CloseButton onClick={() => history.push("/tabs/home")} />
</div>
            <Title fontSize={24} content="정비 예약 (2/4)" />
            <div className="step2-subtitle">요청 사항을 선택해주세요</div>

            {/* 외부 수리 버튼 */}
            <div className="toggle-box" onClick={() => toggleSection("외부 수리")}>
              <div>외부 수리</div>
              <div>{expandedSection === "외부 수리" ? "▴" : "▾"}</div>
            </div>
            {expandedSection === "외부 수리" && renderDetailForm(false)}

            {/* 내부 수리 버튼 */}
            <div className="toggle-box" onClick={() => toggleSection("내부 수리")}>
              <div>내부 수리</div>
              <div>{expandedSection === "내부 수리" ? "▴" : "▾"}</div>
            </div>
            {expandedSection === "내부 수리" && renderDetailForm(true)}
          </div>

          <div style={{ padding: "24px 16px" }}>
            <Button content="다음" color="gray" onClick={handleNext} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Step2;