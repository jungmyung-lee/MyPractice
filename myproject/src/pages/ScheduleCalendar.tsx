// 🔥 전체 캘린더 페이지 (Tabs2 기반) 수정 버전
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./ScheduleCalendar.css";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

import "../beta_app/Layout.css";
import { CloseButton } from "../beta_app/Buttons";
import { Title } from "../beta_app/Title";
import { QuoteCard } from "../beta_app/QuoteCard";
import { Timeline, TimelineItemData } from "../beta_app/TimeLine";

interface Schedule {
  id?: string;
  date: string;
  start: string;
  end: string;
  title?: string;
  content: string;
  status: "before" | "progress" | "done";
  userId?: string;
  customerName?: string;        // 🔹 이미 있으면 OK
  customerContact?: string;     // 🔹 이미 있으면 OK
  location?: string;            // 🔹 이미 있으면 OK
  memo?: string;                // ✅ 이 줄 추가!!
}

const ScheduleCalendar: React.FC = () => {

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [alarmOffset, setAlarmOffset] = useState("10");


  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"before" | "progress" | "done">("before");
  const [customerName, setcustomerName] = useState("");
  const [customerContact, setcustomerContact] = useState("");
  const [location, setLocation] = useState("");
  const [memo, setMemo] = useState("");

  const router = useIonRouter();

  const [titleSelect, setTitleSelect] = useState("정비소 수리");
  const [isCustomTitle, setIsCustomTitle] = useState(false); // 직접입력 여부
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) return;
      const q = query(
        collection(db, "Schedules"),
        where("userId", "==", user.uid)
      );
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Schedule[];
        setSchedules(data);
      });
      return () => unsubscribeSnapshot();
    });
    return () => unsubscribeAuth();
  }, []);

  const filteredSchedules = schedules.filter((s) => {
    const d = new Date(s.date);
    return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
  });

  const groupedSchedules = filteredSchedules.reduce((acc: Record<number, Schedule[]>, item) => {
    const day = new Date(item.date).getDate();
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const handleAddSchedule = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }

  if (selectedDay === null) {
    alert("날짜를 선택해주세요.");
    return;
  }

  if (newTitle.trim() === "") {
    alert("제목을 입력해주세요.");
    return;
  }

  const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  const startDateTime = `${dateStr}T${startTime}`;
  const endDateTime = `${dateStr}T${endTime}`;

  

  await addDoc(collection(db, "Schedules"), {
    date: dateStr,
    start: startDateTime,
    end: endDateTime,
    title: newTitle,
    content: newDescription,
    status,
    userId: user.uid,
    customerName,
    customerContact,
    location,
    memo,
  });

  setShowModal(false);
  setNewTitle("");
  setNewDescription("");
  setcustomerName("");
  setcustomerContact("");
  setLocation("");
  setMemo("");
};

  return (
    <IonPage>
      <IonContent className="schedule-page">
        <div className="container">
          <div className="header-button-container">
            <CloseButton onClick={() => router.push("/tabs2/home")} />
          </div>
          
          <Title content="정비소 일정 관리" fontSize={28}/>

          <div className="calendar-top-container">
            <div className="calendar-month-selector">
              <IonSelect value={selectedYear} onIonChange={(e) => setSelectedYear(e.detail.value)}>
                {[2024, 2025, 2026].map((y) => (
                  <IonSelectOption key={y} value={y}>{y}년</IonSelectOption>
                ))}
              </IonSelect>
              <IonSelect value={selectedMonth} onIonChange={(e) => setSelectedMonth(e.detail.value)}>
                {[...Array(12)].map((_, i) => (
                  <IonSelectOption key={i + 1} value={i + 1}>{i + 1}월</IonSelectOption>
                ))}
              </IonSelect>
            </div>

            <div className="status-legend">
              <div className="status-label status-before">정비 전</div>
              <div className="status-label status-progress">정비 중</div>
              <div className="status-label status-done">정비 완료</div>
            </div>
          </div>

          

          <div className="calendar-grid">
            {[...Array(31)].map((_, index) => {
              const day = index + 1;
              const isToday = day === new Date().getDate();
              return (
                <div
                  key={day}
                  className={`calendar-cell ${isToday ? "today" : ""} ${selectedDay === day ? "selected" : ""}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className="calendar-day-number">{day}</div>
                  <div className="divider" />
                  <div className='schedule-item-container'>
                    {(groupedSchedules[day] || []).map((item, i) => (
                      <div key={i} className={`schedule-item status-${item.status}`}>
                        {/* 제목 대신 색상만 표시 */}
                        {/*<span className={`status-dot status-${item.status}`} />*/}
                      </div>
                    ))}
                  </div>
                  
                </div>
              );
            })}
          </div>
          
          {/* 하단 세부내용 패널 */}

          {selectedDay && (
            <div className="day-schedule-section">
              <Title content={`${selectedDay}.` + "일월화수목금토"[new Date(selectedYear, selectedMonth - 1, selectedDay).getDay()]} fontSize={16} />
              {(groupedSchedules[selectedDay] || []).map((item, idx) => (
                <>
                <div className="timeline-header">
                  <div className={`dot status-${item.status}`} />
                  {item.start.slice(11, 16)}~{item.end.slice(11, 16)} {item.title}
                </div>
                <div style={{marginLeft: '28px'}}>
                  <QuoteCard id={idx.toString()} 
                  modelName={"정보없음"} 
                  location={item.location!} 
                  distance={3.3} 
                  repairDetail={item.memo!} 
                  keywords={[]} 
                  onClick={function (): void {
                    router.push('/quotelist')
                  } } imgSrc={"https://placehold.co/48x48"}/>
                </div>
                </>
              ))}
              <div className="vertical-line"></div>
            </div>
          )}

          <IonFab vertical="bottom" horizontal="end">
            <IonFabButton onClick={() => setShowModal(true)}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>

          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="add-schedule-modal" 
    onClick={(e) => e.stopPropagation()}
      >
      <div className="modal-header">
        <h2>일정 추가</h2>
        <button onClick={() => setShowModal(false)} className="modal-close">취소</button>
      </div>

      <IonSelect
        value={titleSelect}
        onIonChange={(e) => {
          const value = e.detail.value;
          setTitleSelect(value);
          if (value === "직접입력") {
            setIsCustomTitle(true);
            setNewTitle(""); // 초기화
          } else {
            setIsCustomTitle(false);
            setNewTitle(value); // 선택값으로 제목 자동 세팅
          }
        }}
      >
        <IonSelectOption value="정비소 수리">정비소 수리</IonSelectOption>
        <IonSelectOption value="출장 수리">출장 수리</IonSelectOption>
        <IonSelectOption value="직접입력">직접입력</IonSelectOption>
      </IonSelect>

  {isCustomTitle && ( <IonInput placeholder="제목 입력" value={newTitle} onIonChange={(e) => setNewTitle(e.detail.value!)} /> )}





      <div className="time-row">
        <IonInput type="date" value={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`} readonly />
        <IonInput type="time" value={startTime} onIonChange={e => setStartTime(e.detail.value!)} />
      </div>
      <div className="time-row">
        <IonInput type="date" readonly />
        <IonInput type="time" value={endTime} onIonChange={e => setEndTime(e.detail.value!)} />
      </div>

      <div className="color-selector">
        {/* 색상칩은 시각적 기능용이며 실제로 저장은 status */}
        <span className="color-box bg-before" onClick={() => setStatus("before")} />
        <span className="color-box bg-progress" onClick={() => setStatus("progress")} />
        <span className="color-box bg-done" onClick={() => setStatus("done")} />
      </div>

      <div className="status-legend">
        <span className="status-label status-before">정비 전</span>
        <span className="status-label status-progress">정비 중</span>
        <span className="status-label status-done">정비 완료</span>
      </div>

      <IonSelect value={alarmOffset} onIonChange={e => setAlarmOffset(e.detail.value)}>
        <IonSelectOption value="0">정각</IonSelectOption>
        <IonSelectOption value="5">5분 전</IonSelectOption>
        <IonSelectOption value="10">10분 전</IonSelectOption>
        <IonSelectOption value="30">30분 전</IonSelectOption>
      </IonSelect>

      <IonInput placeholder="고객" value={customerName} onIonChange={e => setcustomerName(e.detail.value!)} />
      <IonInput placeholder="고객 연락처" value={customerContact} onIonChange={e => setcustomerContact(e.detail.value!)} />
      <IonInput placeholder="위치" value={location} onIonChange={e => setLocation(e.detail.value!)} />
      <IonInput placeholder="메모" value={memo} onIonChange={e => setMemo(e.detail.value!)} />

      <IonButton expand="block" color="warning" onClick={handleAddSchedule}>
    추가
  </IonButton>
    </div>
    </div>
)}
  </div>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleCalendar;