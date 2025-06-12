import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { SubTitle, Title } from "../beta_app/Title";
import { LocationInput } from "../beta_app/LocationInput";
import { useHistory } from "react-router-dom";
import { BackButton, CloseButton } from "../beta_app/Buttons"; // ✅ 이미 있음 또는 확인
import { useReserve } from "../ReserveContext"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import "../beta_app/Layout.css";
import "./Reserve4.css";
import { Button } from "../beta_app/Buttons";





declare global {
  interface Window {
    naver: any;
  }
}

const Reserve4: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [locationInput, setLocationInput] = useState("");
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const { data, setData } = useReserve(); // 👈 추가
  


  const history = useHistory();

  const handleSubmit = async () => {
  try {
    // 날짜 포맷 생성
    const today = new Date();
    const createdAtFormatted = today
      .toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".")
      .replace(/\s/g, "") + " ~";

      // ReserveContext에 저장
    setData({ createdAt: createdAtFormatted });

    await addDoc(collection(db, "QuoteRequests"), {
      ...data,
      userId: auth.currentUser?.uid ?? "anonymous",
      createdAt: serverTimestamp(),
    });
    alert("✅ 정비 견적 요청이 완료되었습니다.");
    history.push("/reserve/step5");
  } catch (error) {
    console.error("견적 요청 실패:", error);
    alert("❌ 견적 요청 중 오류가 발생했습니다.");
  }
};

  const handleCurrentLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition({ 
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,

    });
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const latlng = new window.naver.maps.LatLng(lat, lng);

    if (map) map.setCenter(latlng);
    if (marker) {
      marker.setPosition(latlng);
    } else {
      const newMarker = new window.naver.maps.Marker({
          position: latlng,
          map,
          icon: {
            content:
              '<div style="width: 20px; height: 20px; background-color: #FF6F1E; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>',
          },
        });
      setMarker(newMarker);
    }

    // ✅ 역지오코딩 (좌표 → 주소)
    window.naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: window.naver.maps.Service.OrderType.ADDR,
      },
      (status: any, response: any) => {
        if (status === window.naver.maps.Service.Status.OK) {
          const result = response.v2.results[0];
          const area1 = result?.region?.area1?.name || "";
          const area2 = result?.region?.area2?.name || "";
          const area3 = result?.region?.area3?.name || "";  // ✅ 동(예: 방촌동)
          const landName = result?.land?.name || "";
          const number1 = result?.land?.number1 || "";

          const address = `${area1} ${area2} ${area3 || landName} ${number1}`.trim();

          
          setData({
            latitude: lat,
            longitude: lng,
            location: address.trim(), // ✅ 자동 주소 저장
          });
          setLocationInput(address.trim());
        } else {
          setData({
            latitude: lat,
            longitude: lng,
            location: "", // 실패 시 빈 값
          });
        }
      }
    );
  } catch (err) {
    alert("현위치를 가져오지 못했습니다.");
  }
};


  const handleAddressSubmit = () => {
    if (!locationInput) return;
    window.naver.maps.Service.geocode({ query: locationInput }, (status: any, response: any) => {
      if (status !== window.naver.maps.Service.Status.OK || response.v2.meta.totalCount === 0) {
        alert("주소를 찾을 수 없습니다.");
        return;
      }
      const item = response.v2.addresses[0];
      const lat = parseFloat(item.y);
      const lng = parseFloat(item.x);
      const latlng = new window.naver.maps.LatLng(lat, lng);

      if (map) map.setCenter(latlng);

      if (marker) {
        marker.setPosition(latlng);
      } else {
        const newMarker = new window.naver.maps.Marker({
          position: latlng,
          map,
          icon: {
            content:
              '<div style="width: 20px; height: 20px; background-color: #FF6F1E; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>',
          },
        });
        setMarker(newMarker);
      }
      setData({
        latitude: lat,
        longitude: lng,
        location: locationInput,
      });
    });
  };

  useEffect(() => {
    const waitForNaver = () =>
      new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (window.naver?.maps) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

    waitForNaver().then(() => {
      if (mapRef.current) {
        const init = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 14,
        });
        setMap(init);
      }
    });
  }, []);

  return (
    <IonPage>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
          <BackButton onClick={() => window.history.back()} />
          <CloseButton onClick={() => history.push("/tabs/home")} />
        </div>

        <Title fontSize={24} content="정비 예약 (4/4)" />
        <SubTitle fontSize={20} content="수리 받을 위치를 알려주세요" />
        <LocationInput
          value={locationInput}
          onLocationClick={handleCurrentLocation}
          onChange={(e) => setLocationInput(e.target.value)}
          handleSubmit={handleAddressSubmit}
        />
        <div className="map-wrapper" ref={mapRef}></div>
        
        <div className="reserve4-button-wrapper">
        <Button content="정비 견적 요청" color="orange" onClick={handleSubmit} />
        </div>

      </div>
    </IonPage>
  );
};

export default Reserve4;