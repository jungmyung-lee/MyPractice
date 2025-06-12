import React, { useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Title, SubTitle } from "../beta_app/Title";
import { TextInput } from "../beta_app/Input";
import { Button, BackButton } from "../beta_app/Buttons";
import "../beta_app/Layout.css";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addUser } from "../services/userService"; // 유저 정보 추가 함수 import
import { signUp } from "../services/authService";
import { collection, addDoc } from "firebase/firestore";

const SignUp2_2: React.FC = () => {
  
  const [bizFile, setBizFile] = useState<File | null>(null);

{/*}
  const [shopName, setShopName] = useState("");
  const [bizNumber, setBizNumber] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");*/}

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation<{ email: string; pw: string }>();
const email = location.state?.email || "";
const pw = location.state?.pw || "";

const SHOP_KEY = "signup_shop_data";



const saveShopToStorage = (data: any) => {
  localStorage.setItem(SHOP_KEY, JSON.stringify(data));
};

// ✅ localStorage에서 즉시 초기값 로딩
const loadShopFromStorage = () => {
  const raw = localStorage.getItem(SHOP_KEY);
  return raw ? JSON.parse(raw) : {
    shopName: "",
    bizNumber: "",
    ceoName: "",
    contact: "",
    address: ""
  };
};

// ✅ 초기값에 바로 반영
const [form, setForm] = useState(loadShopFromStorage);



  // 🔹 파일 업로드 함수 (Storage)
  const uploadBizFile = async (file: File, userId: string): Promise<string> => {
    const storage = getStorage();
    const fileRef = ref(storage, `bizFiles/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  // 🔹 정비소 정보 저장 함수 (Firestore)
  const addMechanicShop = async (
    userId: string,
    data: {
      shopName: string;
      bizNumber: string;
      ceoName: string;
      contact: string;
      address: string;
      bizFileUrl?: string;
    }
  ) => {
    const ref = doc(db, "MechanicShops", userId);
    await setDoc(ref, {
      userId,
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  // 🔹 다음 단계 실행
  const handleNext = async () => {
  if (isLoading) return; // 중복 클릭 방지
  if (!email || !pw) {
    alert("❌ 이전 페이지 정보가 누락되었습니다.");
    return;
  }
  if (
  !form.shopName ||
  !form.bizNumber ||
  !form.ceoName ||
  !form.contact ||
  !form.address
) {
  alert("❌ 모든 필수 항목을 입력해주세요.");
  return;
}

  try {
    setIsLoading(true); // 🔥 로딩 시작
    const user = await signUp(email, pw);
    await addUser(user.uid, form.shopName, "mechanic", form.contact);
    {/* 근데 윗부분은 shopname으로해야할까 ceoname으로 해야할까? */}

    let bizFileUrl = "";
    if (bizFile) {
      bizFileUrl = await uploadBizFile(bizFile, user.uid);
    }
    await addMechanicShop(user.uid, {
      ...form,
      bizFileUrl,
    });

    await addDoc(collection(db, "GarageRequests"), {
  email,
  ...form,
  bizFileUrl, // 🔹 이게 imageUrl 역할
  createdAt: serverTimestamp(),
});

    localStorage.removeItem("signup_user_data");
      localStorage.removeItem("signup_shop_data");

    alert("✅ 회원가입이 완료되었습니다!");
    history.push("/approvalpending");
  } catch (e: any) {
    console.error(e);
    alert("❌ 회원가입 중 오류가 발생했습니다: " + e.message);
  } finally {
    setIsLoading(false); // 🔥 로딩 끝
  }
};

useEffect(() => {
  const saved = loadShopFromStorage();
  if (saved) {
    setForm(saved);
  }
}, []);

useEffect(() => {
  saveShopToStorage(form);
}, [form]);

  return (
  <IonPage>
    <IonContent>
      <div className="container">
        <div style={{ width: '100%', height: '64px', display: 'flex' }}>
          <BackButton onClick={() => window.history.back()} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <div className="header">
            <Title fontSize={28} content="회원가입 (2/2)" />
          </div>
          <div className="content">
            {/* 입력 필드 */}
            <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <SubTitle fontSize={20} content="정비소명 (상호)" />
              <TextInput
                placeHolder="OO건설기계정비"
                value={form.shopName}
                onChange={(e) => setForm((f :typeof form) => ({ ...f, shopName: e.target.value }))}
              />
            </div>
            <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <SubTitle fontSize={20} content="사업자등록번호" />
              <TextInput
                placeHolder="123-45-67890"
                value={form.bizNumber}
                onChange={(e) => setForm((f :typeof form) => ({ ...f, bizNumber: e.target.value }))}
              />
            </div>
            <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <SubTitle fontSize={20} content="사업자등록증 첨부" />
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setBizFile(e.target.files[0]);
                  }
                }}
                style={{ marginBottom: '12px' }}
              />
            </div>
            <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <SubTitle fontSize={20} content="대표자명" />
              <TextInput
                placeHolder="홍길동"
                value={form.ceoName}
                onChange={(e) => setForm((f :typeof form) => ({ ...f, ceoName: e.target.value }))}
              />
            </div>
            <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <SubTitle fontSize={20} content="정비소 연락처" />
              <TextInput
                placeHolder="010-0000-0000"
                value={form.contact}
                onChange={(e) => setForm((f: typeof form) => ({ ...f, contact: e.target.value }))}
              />
            </div>
            <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <SubTitle fontSize={20} content="정비소 주소" />
              <TextInput
                placeHolder="부산광역시 강서구..."
                value={form.address}
                onChange={(e) => setForm((f :typeof form) => ({ ...f, address: e.target.value }))}
              />
            </div>
            <div className="button-container" style={{ marginTop: 24 }}>
              <Button
                content={isLoading ? "로딩중..." : "다음"}
                color={isLoading ? "gray" : "orange"}
                onClick={handleNext}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
);
};

export default SignUp2_2;