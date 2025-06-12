import { IonPage, useIonRouter } from "@ionic/react";
import { BackButton, CloseButton, RightArrowButton, Button } from "../beta_app/Buttons";
import { Title, SubTitle } from "../beta_app/Title";
import Stepper from "../beta_app/Stepper";
import { useReserve } from "../ReserveContext";
import "../beta_app/Layout.css";

const OnSite4: React.FC = () => {
  const router = useIonRouter();
  const steps = ["견적 요청중", "견적 수락", "정비 진행중", "정비완료", "결제완료"];
  const currentStatus = 0;

  const { data } = useReserve();



  const {
    plateNumber,
    modelName,
    repairMethod,
    location,
    requestType,
    errorType,
    mediaUrl,
    createdAt,
  } = data;

  return (
    <IonPage>
      <div className="container">
        {/* 상단 바 */}
        <div
          style={{
            width: "100%",
            height: "64px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <BackButton />
          <CloseButton onClick={() => router.push("/tabs/home")} />
        </div>

        {/* 본문 내용 */}
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <Title fontSize={28} content="견적 요청이 완료되었어요 :)" />
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{textDecoration: 'underline', fontSize: '17px', paddingBottom: '8px', color: 'black', fontFamily: 'Noto Sans KR', fontWeight: '550', wordWrap: 'break-word'}}
                        onClick = {()=>router.push('/tabs/status')}
            >
                현황/내역 
            </div>
            <SubTitle fontSize={16} content="에서 받은 견적을 확인할 수 있어요!" />
          </div>
          

          {/* 카드 UI */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
              backgroundColor: "white",
              padding: "8px",
              gap: "8px",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "#7A7D7F",
                fontSize: 16,
                fontFamily: "Noto Sans KR",
                fontWeight: 500,
                lineHeight: "120%",
              }}
            >
              {createdAt || "날짜 없음"}
            </div>
            <div
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: "Noto Sans KR",
                fontWeight: 500,
                lineHeight: "120%",
              }}
            >
              견적 요청중
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  border: "0.5px #7A7D7F solid",
                }}
                src={mediaUrl || "/crane.png"}
                alt="장비 이미지"
              />

              <div style={{ flex: 1 }} />

              <div
                style={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 500,
                      lineHeight: "120%",
                    }}
                  >
                    {plateNumber}
                  </span>{" "}
                  <span
                    style={{
                      color: "#454A4D",
                      fontSize: 16,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 500,
                      lineHeight: "120%",
                    }}
                  >
                    {modelName}
                  </span>
                </div>

                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 500,
                      lineHeight: "120%",
                    }}
                  >
                    {repairMethod} 수리 -
                  </span>{" "}
                  <span
                    style={{
                      color: "#454A4D",
                      fontSize: 16,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 500,
                      lineHeight: "120%",
                    }}
                  >
                    {location}
                  </span>
                </div>

                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 500,
                      lineHeight: "120%",
                    }}
                  >
                    {requestType} -
                  </span>{" "}
                  <span
                    style={{
                      color: "#454A4D",
                      fontSize: 16,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 500,
                      lineHeight: "120%",
                    }}
                  >
                    {errorType}
                  </span>
                </div>
              </div>

              <div style={{ flex: 1 }} />
              <RightArrowButton size={20} />
            </div>

            <Stepper currentStep={currentStatus} steps={steps} />
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="button-container">
          <Button
            onClick={() => router.push("/tabs/home")}
            content="완료"
            color="orange"
          />
        </div>
      </div>
    </IonPage>
  );
};

export default OnSite4;