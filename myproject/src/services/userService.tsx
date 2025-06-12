import { db } from "../config/firebaseConfig";
import { collection, addDoc, doc, getDoc, deleteDoc, updateDoc, setDoc,arrayUnion, serverTimestamp } from "firebase/firestore";

// ✅ 사용자 프로필 가져오기 (users중 userId에 해당하는 user 데이터 "하나" 가져오기.)
export const getUserProfile = async (userId: string) => {
    const userRef = doc(db, "Users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : { nickname: "익명", avatar: "/default-avatar.png" };
  };

// ✅ 기본 아바타 이미지 URL
const DEFAULT_AVATAR_URL = "https://example.com/default-avatar.png"; // 기본 프로필 이미지 경로

/**
 * 🔹 사용자 추가 함수
 * - `userType`이 "garageOwner"이면 `garageId` 없이 저장 후 나중에 연결
 * - `userType`이 "driver"이면 일반적으로 저장
 */
export const addUser = async (userId: string, nickname: string, userType: string, phone: string, avatar?: string) => {
  try {
    const userRef = doc(db, "Users", userId);
    
    let userData: any = {
      userId,
      nickname,
      userType,// "driver" 또는 "mechanic"
      phone,
      avatar: avatar && avatar.trim() ? avatar : DEFAULT_AVATAR_URL,
      createdAt: serverTimestamp(),
      
    };

    // 2️⃣ 정비사(mechanic)라면 `garage` 필드 추가
    if (userType === "mechanic") {
      userData.garageId = ""; // ✅ Firestore에 `garage` 필드로 저장
    }

    await setDoc(userRef, userData);
    console.log("✅ 사용자 추가 완료:", userId);
    return userData;
  } catch (error) {
    console.error("❌ 사용자 추가 실패:", error);
  }
};

// ✅ 사용자 삭제 함수
export const deleteUser = async (userId: string) => {
  const userRef = doc(db, "Users", userId);
  await deleteDoc(userRef);
  console.log("✅ 사용자 삭제 완료:", userId);
};

// ✅ 사용자 프로필 업데이트
export const updateUserProfile = async (userId: string, newNickname: string, newAvatar: string, newPhone:string) => {
  const userRef = doc(db, "Users", userId);
  await updateDoc(userRef, { nickname: newNickname, avatar: newAvatar, phone:newPhone });
  console.log("✅ 사용자 프로필 업데이트 완료:", userId);
};
  
  // ✅ 1대1 메시지 전송
  export const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    const chatId = [senderId, receiverId].sort().join("_"); // 🔥 고유한 채팅 ID 생성
    const chatRef = doc(db, "Chats", chatId);
    await updateDoc(chatRef, {
      messages: arrayUnion({ senderId, message, createdAt: new Date().toISOString() }),
    });
  };
  
  // ✅ 특정한 chatid를 입력해서 그 chatid의 messages 배열을 반환함.
  export const getMessages = async (chatId:string) => {
    const chatRef = doc(db, "Chats", chatId);
    const chatSnap = await getDoc(chatRef);
    return chatSnap.exists() ? chatSnap.data().messages : []; //1대1 메세지 가져오기니까 messages 마지막에 return 해야지 ㅇㅇ
  };

  