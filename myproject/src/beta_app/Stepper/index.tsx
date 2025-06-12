import React from "react";

interface StepperProps {
  currentStep: number;     // 현재 위치한 단계 (0부터 시작)
  steps: string[];         // 단계 이름 목록을 외부에서 전달
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#DBDBDB", 
        padding: "8px",
        borderRadius: "12px",
        position: 'relative'
      }}
    >
      {steps.map((step, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div style={{display: 'flex', flexDirection: 'column',gap: '3px', alignItems: 'center',}}>
                {/* 원 */}
                <div
                    style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: index === currentStep ? "#FF6F1E" : "#7A7D7F", // orange-500 or gray-400
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1
                    }}
                ></div>

                {/* 텍스트 */}
                <div
                    style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    width: "60px",
                    textAlign: "center",
                    color: index === currentStep ? "#000000" : "#7A7D7F",
                    fontWeight: index === currentStep ? "bold" : "bold",
                    }}
                >
                    {step}
                </div>
            </div>
        </div>
      ))}

      {/* 선 */}
      <div
        style={{
          position: "absolute",
          bottom: "37px", // 원의 중앙 높이에 맞춤 (조정 가능)
          left: "32px",
          right: "32px",
          height: "2px",
          backgroundColor: "#7A7D7F", // gray-400
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default Stepper;
