import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent, IonModal, IonButton, IonCheckbox, useIonRouter, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { useHistory } from "react-router-dom";
import { getAllGarages } from "../services/garageService";
import "../beta_app/Layout.css";
import "./GarageList.css"
import { toastController } from "@ionic/core";
import { CloseButton } from "../beta_app/Buttons";
import { Title } from "../beta_app/Title";
import { LocationInput } from "../beta_app/LocationInput";
import { DropDown } from "../beta_app/DropDown";
import { GarageCard } from "../beta_app/GarageCard";



declare global {
  interface Window {
    naver: any;
    scrollToGarage?: (id: string) => void;
  }
}

const serviceList = [
  "불도저", "굴착기", "로더", "지게차", "스크레이퍼", "덤프트럭", "기중기",
  "모터그레이더", "롤러", "노상안전기", "콘크리트뱃칭플랜트", "콘크리트피니셔", "콘크리트살포기",
  "콘크리트믹서트럭", "콘크리트펌프", "아프팔트믹싱플랜트", "아스팔트피니셔", "아스팔트살포기",
  "골재살포기", "쇄석기", "공기압축기", "천공기", "항타및항발기", "자갈채취기", "준설선",
  "특수건설기계", "타워크레인", "기타"
];

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

const GarageList: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [garages, setGarages] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationInput, setLocationInput] = useState("");
  const [map, setMap] = useState<any>(null);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [garageMarkers, setGarageMarkers] = useState<any[]>([]);
  const [selectedGarageId, setSelectedGarageId] = useState<string | null>(null);
  const history = useHistory();
  const [allGarages, setAllGarages] = useState<any[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [clusterer, setClusterer] = useState<any>(null); // 클러스터러 추가
  const router = useIonRouter();
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const page= useRef(null);

  const showToast = async (msg: string) => {
    const toast = await toastController.create({
      message: msg,
      duration: 2000,
      position: "bottom",
    });
    await toast.present();
  };

  //빈배열이나 serviceList에 없는것들은 "기타"로 통일 ㄱㄱ
  const normalizeService = (service: string) => {
    if (service === "지게차종합") return "지게차";
    return serviceList.includes(service) && service !== "기타" ? service : "기타";
  };

  const updateNearbyGarages = async (lat: number, lng: number) => {
    const all = await getAllGarages();
  
    const enriched = all
      .map((garage) => {
        const distance = getDistance(lat, lng, garage.latitude, garage.longitude);
        return { ...garage, distance };
      })
      .filter((g) => g.distance <= 100)
      .sort((a, b) => a.distance - b.distance);
  
    // ✅ 마커 먼저 제거
    garageMarkers.forEach((marker) => marker.setMap(null));
    setGarageMarkers([]); // 마커 상태도 초기화
  
    // ✅ UI 상태 업데이트
    setAllGarages(enriched);
    setGarages(enriched);
  
    // ✅ 마커 새로 생성
    if (map) {
      const newMarkers = enriched.map((garage) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(garage.latitude, garage.longitude),
          map,
          title: garage.name,
          icon: {
            content: `<div style="width: 24px; height: 24px; background-color: #007aff; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>`,
          },
        });
  
        marker.addListener("click", () => {
          setSelectedGarageId(garage.id);
          const info = new window.naver.maps.InfoWindow({
            content: `
              <div style='padding:6px 10px; font-size:14px;'>
                <div style='margin-bottom:6px; font-weight:bold;'>${garage.name}</div>
                <button onclick="window.scrollToGarage('${garage.id}')" style="padding:4px 8px; background-color:#007aff; color:white; border:none; border-radius:6px; cursor:pointer;">
                  리스트로 이동
                </button>
              </div>
            `,
          });
          info.open(map, marker);
        });
  
        return marker;
      });
  
      setGarageMarkers(newMarkers); // ✅ 새 마커로 갱신
    }
  };

  const applyFilters = () => {
    if (selectedFilters.length === 0) {
      setGarages(allGarages);
      // 모든 마커 다시 그리기
      garageMarkers.forEach((marker) => marker.setMap(null));
      if (map) {
        const newMarkers = allGarages.map((garage) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(garage.latitude, garage.longitude),
            map,
            title: garage.name,
            icon: {
              content: `<div style="width: 24px; height: 24px; background-color: #007aff; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>`,
            },
          });
          marker.addListener("click", () => {
            setSelectedGarageId(garage.id);
            const info = new window.naver.maps.InfoWindow({
              content: `<div style='padding:6px 10px; font-size:14px;'>
                <div style='margin-bottom:6px; font-weight:bold;'>${garage.name}</div>
                <button onclick="window.scrollToGarage('${garage.id}')" style="padding:4px 8px; background-color:#007aff; color:white; border:none; border-radius:6px; cursor:pointer;">
                  리스트로 이동
                </button>
              </div>`,
            });
            info.open(map, marker);
          });
          return marker;
        });
        setGarageMarkers(newMarkers);
      }
      setShowFilterModal(false);
      return;
    }
  
    const filtered = allGarages.filter((garage) => {
      let services: string[] = [];
  
      try {
        if (typeof garage.mainServices === "string") {
          services = JSON.parse(garage.mainServices.replace(/'/g, '"'));
          services = services.map(normalizeService);
        } else if (Array.isArray(garage.mainServices)) {
          services = garage.mainServices.map(normalizeService);
        } else {
          services = ["기타"];
        }
      } catch {
        services = ["기타"];
      }
  
      return selectedFilters.some((filter) => services.includes(filter));
    });
  
    setGarages(filtered);
  
    // 기존 마커 제거
    garageMarkers.forEach((marker) => marker.setMap(null));
  
    // 필터된 마커만 다시 생성
    if (map) {
      const newMarkers = filtered.map((garage) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(garage.latitude, garage.longitude),
          map,
          title: garage.name,
          icon: {
            content: `<div style="width: 24px; height: 24px; background-color: #007aff; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>`,
          },
        });
        marker.addListener("click", () => {
          setSelectedGarageId(garage.id);
          const info = new window.naver.maps.InfoWindow({
            content: `<div style='padding:6px 10px; font-size:14px;'>
              <div style='margin-bottom:6px; font-weight:bold;'>${garage.name}</div>
              <button onclick="window.scrollToGarage('${garage.id}')" style="padding:4px 8px; background-color:#007aff; color:white; border:none; border-radius:6px; cursor:pointer;">
                리스트로 이동
              </button>
            </div>`,
          });
          info.open(map, marker);
        });
        return marker;
      });
      setGarageMarkers(newMarkers);
    }
  
    setShowFilterModal(false);
  };
  const handleFilterToggle = (service: string, checked: boolean) => {
    setSelectedFilters((prev) =>
      checked ? [...prev, service] : prev.filter((s) => s !== service)
    );
  };

  const handleCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // GPS 사용 적극적으로
        maximumAge: 10000,        // 10초 이내 캐시된 위치 사용 허용
        timeout: 5000             // 5초 넘게 못 받으면 실패 처리
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setUserLocation({ lat, lng });
  
      const latlng = new window.naver.maps.LatLng(lat, lng);
  
      if (map) map.setCenter(latlng);
  
      if (userMarker) {
        userMarker.setPosition(latlng);
        userMarker.setZIndex(999);
      } else {
        const marker = new window.naver.maps.Marker({
          position: latlng,
          map,
          title: "내 위치",
          zIndex: 999,
          icon: {
            content:
              '<div style="width: 24px; height: 24px; background-color: #ff3b30; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>',
          },
        });
  
        const info = new window.naver.maps.InfoWindow({
          content: `<div style='padding:6px 10px;'>현위치</div>`,
        });
  
        info.open(map, marker);
        setUserMarker(marker);
      }
  
      if (map) {
        await updateNearbyGarages(lat, lng);
      }
  
      // 역지오코딩은 잠시 주석 처리된 상태
      /*
      window.naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [
            window.naver.maps.Service.OrderType.ADDR,
            window.naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        (status: any, response: any) => {
          if (status === window.naver.maps.Service.Status.OK) {
            const items = response.v2.results;
            const road = items.find((item: any) => item.name === "roadaddr");
            const jibun = items.find((item: any) => item.name === "addr");
            const address =
              (road && road.region.area1.name + " " + road.land.name) ||
              (jibun && jibun.region.area1.name + " " + jibun.land.number1) ||
              "";
            setLocationInput(address);
          }
        }
      );
      */
  
      // setMap은 여기서 map과 마커 둘 다 있을 때 안전하게
      if (userMarker && map) {
        userMarker.setMap(map);
      }
  
    } catch (err) {
      console.error("현위치 처리 중 오류 발생:", err);
      alert("현위치 정보를 가져오는 중 문제가 발생했습니다.");
    }
  };

  const handleAddressConfirm = () => {
    window.naver.maps.Service.geocode({ query: locationInput }, async (status: any, response: any) => {
      if (status === window.naver.maps.Service.Status.ERROR || response.v2.meta.totalCount === 0) {
        showToast("❌ 주소를 찾을 수 없습니다.");
        return;
      }

      const item = response.v2.addresses[0];
      const lat = parseFloat(item.y);
      const lng = parseFloat(item.x);
      setUserLocation({ lat, lng });

      const newLatLng = new window.naver.maps.LatLng(lat, lng);
      map.setCenter(newLatLng);

      if (userMarker) {
        userMarker.setPosition(newLatLng);
      } else {
        const marker = new window.naver.maps.Marker({
          position: newLatLng,
          map,
          title: "입력 위치",
          icon: {
            content: '<div style="width: 24px; height: 24px; background-color: #ff3b30; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>',
          },
        });
        setUserMarker(marker);
      }

      await updateNearbyGarages(lat, lng);
    });
  };

  useEffect(() => {
    const initMap = async () => {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true, // GPS 사용 적극적으로
      maximumAge: 10000,        // 10초 이내 캐시된 위치 사용 허용
      timeout: 5000             // 5초 넘게 못 받으면 실패 처리
    });
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    setUserLocation({ lat: userLat, lng: userLng });

  
    // ✅ window.naver가 완전히 로드될 때까지 대기
    const waitForNaver = () =>
      new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (window.naver && window.naver.maps) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

    await waitForNaver(); // 기다림
    
    if (mapRef.current) {
    const initMap = new window.naver.maps.Map(mapRef.current, {
    center: new window.naver.maps.LatLng(userLat, userLng),
    zoom: 10,
    });
    setMap(initMap);
    
    const marker = new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(userLat, userLng),
    map: initMap,
    title: "내 위치",
    icon: {
    content: '<div style="width: 24px; height: 24px; background-color: #ff3b30; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>',
    },
    });
    setUserMarker(marker);
    }
    };
    
    initMap();
    
    window.scrollToGarage = (id: string) => {
    const targetCard = document.getElementById(`garage-${id}`);
    if (targetCard) {
    targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    targetCard.classList.add("highlight-glow");
    setTimeout(() => {
    targetCard.classList.remove("highlight-glow");
    }, 2000);
    }
    };
    }, []);

    useEffect(() => {
      if (map && userLocation) {
        updateNearbyGarages(userLocation.lat, userLocation.lng);
      }
    }, [map]);
    
    

  

   

  const handleCardClick = (garageId: string) => {
    const targetCard = document.getElementById(`garage-${garageId}`);
    if (targetCard) {
      targetCard.classList.add("flash-on-click");
      setTimeout(() => {
        targetCard.classList.remove("flash-on-click");
      }, 100);
    }
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return (
    <IonPage>
      <div className="container">
        <div style={{width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"end"}} > 
            <CloseButton onClick={() => router.push('/tabs/home')}/>
        </div>
        <div className="header" >
          <Title content="내 근처 정비소 찾기" fontSize={28} />
        </div>

        <div style={{overflow: 'visible', display: 'flex', flexDirection: 'column', gap: '8px'}} className="content">
          <LocationInput value={locationInput} 
                        onChange={(e) => setLocationInput(e.target.value)} 
                        onLocationClick={handleCurrentLocation}
                        handleSubmit={handleAddressConfirm}/>
          <IonContent >
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>

              <div style={{width: '100%', aspectRatio: '3/2', borderRadius: '8px', backgroundColor: 'lightgray'}} ref={mapRef}></div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <DropDown  size="custom-select-small" options={['거리순'] } />
                <button onClick={() => setShowFilterModal(true)}style={{height: '23px', paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3, background: 'white', overflow: 'hidden', borderRadius: 6, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                  <div style={{textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: 16.80, wordWrap: 'break-word'}}>필터</div>
                </button>
              </div>

              {garages.map((garage) => (
                <GarageCard key={garage.id} id={`garage-${garage.id}`}
                className={`garage-card ${selectedGarageId === garage.id ? "highlight" : ""}`}
                 title={garage.name}
                 onClick={() => history.push(`/garagedetailpage1/${garage.id}`)}
                 distance={garage.distance.toFixed(1)}
                 address={garage.address}
                 hashTag={
                  typeof garage.mainServices === 'string'
                    ? JSON.parse(garage.mainServices.replace(/'/g, '"'))
                    : garage.mainServices || []
                }
                 imgSrc="https://firebasestorage.googleapis.com/v0/b/my-awesome-project-id-12ff9.firebasestorage.app/o/testUploads%2F1743588807056-1000036152.png?alt=media&token=bfd1aa03-dec8-4741-b931-f7f69e419074"
                 />
              ))}
              
            </div>
          </IonContent>
        </div>

         {/* 필터 모달 */}
         <IonModal id="garage-modal" presentingElement={presentingElement!} isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
              <IonButton  onClick={applyFilters}>필터 적용</IonButton>
              </IonButtons>
              <IonTitle>필터 선택</IonTitle>
              <IonButtons slot="end">
                <IonButton  onClick={() => setShowFilterModal(false)}>나가기</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {serviceList.map((service) => (
              <div key={service} >
                <IonCheckbox
                  checked={selectedFilters.includes(service)}
                  onIonChange={(e) => handleFilterToggle(service, e.detail.checked)}
                />
                <span style={{ marginLeft: "8px" }}>{service}</span>
              </div>
            ))}

          </IonContent>
        </IonModal>
      </div>
    </IonPage>
  );
};

export default GarageList;