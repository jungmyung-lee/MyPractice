import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Firestore DB import

const DEFAULT_AVATAR_URL = "https://example.com/default-avatar.png"; // 기본 프로필 이미지

// 🔹 로그인 함수 (로그인 유지 여부 추가)
export const login = async (email: string, password: string, keepLoggedIn = false) => {
  try {
    // 🔸 로그인 유지 여부에 따라 persistence 설정
    const persistence = keepLoggedIn ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistence);

    // 🔸 로그인 실행
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ 로그인 성공:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("❌ 로그인 실패:", error);
    throw error;
  }
};

// 🔹 회원가입 함수 (이메일 & 비밀번호)
export const signUp = async (email: string, password: string) => {
  try {
    // 🔸 Firebase Authentication으로 유저 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // 🔸 생성된 유저 정보 반환
    return userCredential.user;
  } catch (error: any) {
    console.error("❌ 회원가입 실패:", error);
    throw new Error(error.message); // 오류 메시지를 호출한 곳으로 전달
  }
};

// 🔹 로그아웃
export const logout = async () => {
  return await signOut(auth);
};
