import { collection, doc, addDoc, deleteDoc, updateDoc, getDoc, getDocs,query, where, orderBy, serverTimestamp,setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getDistance } from "geolib"; // ✅ getDistance를 직접 가져오기// 🔹 거리 계산을 위한 라이브러리

// ✅ Firestore에 견적 추가 (문서 ID 생성 후 반환)
export const addQuoteOffer = async (
  driverId: string,
  garageId: string,
  garageName: string,
  description: string,
  price: string,
  contactInfo: string
) => {
  try {
    const docRef = await addDoc(collection(db, "QuoteOffers"), {
      driverId,
      garageId,
      garageName,
      description,
      price,
      status: "pending",
      createdAt: new Date(),
      contactInfo,
      imageUrl: "", // ✅ 초기에는 빈 값
    });

    await updateDoc(doc(db, "QuoteOffers", docRef.id), { id: docRef.id });
    return docRef.id; // ✅ 생성된 quoteOfferId 반환
  } catch (error) {
    console.error("❌ 견적 추가 실패:", error);
    return null;
  }
};


/**
 * 🔹 특정 quoteId에 해당하는 견적 요청 정보 가져오기
 */
export const getQuoteRequestById = async (quoteId: string) => {
  try {
    const quoteRef = doc(db, "QuoteRequests", quoteId);
    const quoteSnap = await getDoc(quoteRef);

    if (quoteSnap.exists()) {
      return quoteSnap.data();
    } else {
      console.warn(`🚨 견적 요청을 찾을 수 없음: ${quoteId}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Firestore에서 견적 요청을 가져오는 데 실패:", error);
    return null;
  }
};

/**
 * 🔹 특정 정비소(garageId)가 받은 견적 요청 목록을 가져오는 함수
 */
export const getReceivedQuoteRequests = async (garageId: string) => {
  try {
    const quoteRequestsRef = collection(db, "QuoteRequests");
    const q = query(quoteRequestsRef, where("garageGroups", "array-contains", garageId));
    const snapshot = await getDocs(q);

    const receivedQuotes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`📩 ${garageId}가 받은 견적 요청 수:`, receivedQuotes.length);
    return receivedQuotes;
  } catch (error) {
    console.error("❌ 견적 요청 목록 조회 실패:", error);
    throw error;
  }
};


/**
 * 🔹 기사(사용자)가 정비사들에게 받은 견적 리스트 가져오기
 * @param userId - 기사(사용자)의 ID
 */
export const getDriverQuoteOffers = async (userId: string) => {
  try {
    const quotesRef = collection(db, "QuoteOffers"); // ✅ 정비사가 기사에게 보낸 견적
    const q = query(quotesRef, where("driverId", "==", userId)); // 🔹 기사 ID로 필터링
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      garageName: doc.data().garageName,
      description: doc.data().description,
      price: doc.data().price,
      status: doc.data().status,
      contactInfo: doc.data().contactInfo,
      imageUrl: doc.data().imageUrl || "", // 이미지 URL이 없으면 빈 문자열 반환
      createdAt: doc.data().createdAt.toDate().toISOString(),
    })) as any[];
  } catch (error) {
    console.error("❌ 받은 견적을 가져오는 데 실패:", error);
    throw error;
  }
};



/**
 * 🔹 Firestore에 견적 요청을 저장하고, 50km 이내 정비소의 ID를 `garageGroups` 필드에 저장
 */
export const createQuoteRequest = async (
  driverId: string,
  description: string,
  contactInfo: string,
  lat: number,
  lng: number,
  imageUrl?: string
) => {
  try {
    // 1️⃣ Firestore에 문서 ID 미리 생성
    const quoteRef = doc(collection(db, "QuoteRequests"));
    const quoteId = quoteRef.id;

    // 2️⃣ 50km 이내의 정비소 찾기
    const garagesRef = collection(db, "Garages");
    const garagesSnapshot = await getDocs(garagesRef);
    const garageGroups: string[] = [];

    

    garagesSnapshot.forEach((doc) => {
      const garage = doc.data();
      const distance = getDistance(
        { latitude: lat, longitude: lng },
        { latitude: garage.latitude, longitude: garage.longitude }
      );

      

      if (distance / 1000 <= 50) {
        garageGroups.push(doc.id); // 정비소 ID 저장
      }
    });

    console.log(`✅ ${garageGroups.length}개 정비소가 요청을 받을 예정`);

    // 3️⃣ Firestore에 견적 요청 저장 (garageGroups 포함)
    const quoteData = {
      id: quoteId,
      driverId,
      description,
      contactInfo,
      location: { lat :lat ?? null, lng : lng ?? null },
      imageUrl : imageUrl?? null,
      status: "pending",
      createdAt: serverTimestamp(),
      garageGroups, // 🚀 정비소 ID 배열 추가
    };

    await setDoc(quoteRef, quoteData);
    console.log("🚀 견적 요청 생성 완료:", quoteId);

    return { quoteId, sentTo: garageGroups.length };
  } catch (error) {
    console.error("❌ 견적 요청 실패:", error);
    throw error;
  }
};


/**
 * 🔹 정비소 추가 함수
 * - 정비소 정보를 저장한 후 해당 운영자의 `garageId`를 `Users` 컬렉션에 업데이트
 */
export const addGarage = async (userId: string, name: string, latitude: number, longitude: number, description: string, contactInfo: string) => {
  try {
    // 1️⃣ Firestore에 정비소 데이터 추가
    const garagedoc = await addDoc(collection(db, "Garages"), {
      name,
      latitude,
      longitude, // 위치 저장
      ownerId: userId,
      phone: contactInfo,
      description,
      createdAt: serverTimestamp(),
      mainServices:""
     });

    const garageId = garagedoc.id;

    // 2️⃣ Users 컬렉션에서 해당 운영자의 `garageId` 업데이트
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, { garageId });

    console.log("✅ 정비소 추가 완료:", garageId);
    return garageId;
  } catch (error) {
    console.error("❌ 정비소 추가 실패:", error);
  }
};

// 🔹 2️⃣ 정비소 삭제
export const deleteGarage = async (garageId: string) => {
  try {
    await deleteDoc(doc(db, "Garages", garageId));
    console.log(`🗑️ 정비소 삭제 완료: ${garageId}`);
  } catch (error) {
    console.error("❌ 정비소 삭제 실패:", error);
    throw error;
  }
};

// 🔹 3️⃣ 정비소 정보 수정
export const updateGarage = async (garageId: string, updatedData: Partial<{ name: string; latitude: number; longitude: number; description: string; contactInfo: string }>) => {
  try {
    await updateDoc(doc(db, "Garages", garageId), updatedData);
    console.log(`✏️ 정비소 업데이트 완료: ${garageId}`);
  } catch (error) {
    console.error("❌ 정비소 업데이트 실패:", error);
    throw error;
  }
};

// ✅ 특정 `garageId`에 해당하는 정비소 정보 가져오기 (필요한 필드만 반환)
export const getGarageById = async (garageId: string) => {
  try {
    const docSnap = await getDoc(doc(db, "Garages", garageId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || "", // ✅ 정비소 이름
        description: data.description || "", // ✅ 설명
        createdAt: data.createdAt || null, // ✅ 생성 날짜 (타입 변환 가능)
        latitude: data.latitude || null, // ✅ 위도
        longitude: data.longitude || null, // ✅ 경도
        ownerId: data.ownerId || "", // ✅ 소유자 ID
        phone: data.phone || "", // ✅ 연락처
        mainServices: data.mainServices || null,
        address: data.address
      };
    } else {
      console.log("⚠️ 해당 정비소 없음:", garageId);
      return null;
    }
  } catch (error) {
    console.error("❌ 정비소 정보 가져오기 실패:", error);
    throw error;
  }
};

// 🔹 5️⃣ 모든 정비소 가져오기
export const getAllGarages = async () => {
  try {
    const snapshot = await getDocs(collection(db, "Garages"));
    
    return snapshot.docs.map(doc => ({ 
        id: doc.id,
        name: doc.data().name,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
        description: doc.data().description,
        phone: doc.data().phone,
        ownerId: doc.data().ownerId,
        createdAt: doc.data().createdAt,
        mainServices: doc.data().mainServices,
        address: doc.data().address,
    
    
    }));
  } catch (error) {
    console.error("❌ 모든 정비소 가져오기 실패:", error);
    throw error;
  }
};

// 🔹 6️⃣ 반경 50km 내 정비소 가져오기 (Haversine 공식 사용)
export const getNearbyGarages = async (lat: number, lng: number, radiusKm: number = 50) => {
  const R = 6371; // 지구 반지름 (km)
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };

  try {
    
    const allGarages = await getAllGarages();
    //()을 붙여야 반환하는것이 배열이된다.

    // 🔹 사용자 위치를 기준으로 반경 내 정비소 필터링
    return allGarages.filter(garage =>
      getDistance(lat, lng, garage.latitude, garage.longitude) <= radiusKm
    );
  } catch (error) {
    console.error("❌ 반경 내 정비소 가져오기 실패:", error);
    throw error;
  }
};



/**
 * 🔹 Firestore에 견적 요청을 저장하면서 `id`를 문서의 key 값으로 설정
 */
export const sendQuote = async (
  garageId: string,
  name: string,
  contactInfo: string,
  description: string
) => {
  try {
    // 1️⃣ Firestore에서 사용할 문서 ID 생성 (자동 생성)
    const quoteDocRef = doc(collection(db, "Quotes")); // 새로운 문서 ID 자동 생성
    const quoteId = quoteDocRef.id; // 문서 ID 가져오기

    // 2️⃣ Firestore에 저장할 데이터
    const quoteData = {
      id: quoteId, // 문서 ID도 데이터에 포함
      garageId,
      name,
      contactInfo,
      description,
      createdAt: serverTimestamp(), // Firestore 서버 시간을 사용
    };

    // 3️⃣ Firestore에 `setDoc()`으로 문서 저장 (ID 지정)
    await setDoc(quoteDocRef, quoteData);

    console.log("🚀 견적 요청 성공:", quoteId);
    return quoteId;
  } catch (error) {
    console.error("❌ 견적 요청 실패:", error);
    throw error;
  }
};



export const getQuotesByGarage = async (garageId: string) => {
  const quotesRef = collection(db, "Quotes");
  const q = query(quotesRef, where("garageId", "==", garageId), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    garageId: doc.data().garageId,
    name: doc.data().name,
    contactInfo: doc.data().contactInfo,
    description: doc.data().description,
    createdAt: doc.data().createdAt,

  }));
};