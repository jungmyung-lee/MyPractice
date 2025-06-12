// ReserveContext.tsx
import React, { createContext, useContext, useState } from "react";


export interface ReserveData {
  machineId?: string;
  requestType?: string;
  repairDetail?: string;
  errorCode?: string;
  repairMethod?: "정비소" | "출장";
  location?: string;
  latitude?: number;       // ✅ 추가
  longitude?: number;      // ✅ 추가
  errorType?: string[];      // ✅ 고장 유형 추가
  mediaUrl?: string;       // ✅ 이미지/영상 URL 추가 (dataUrl도 가능)
  plateNumber?: string; // ✅ 추가
  modelName?: string;   // ✅ 추가
  createdAt? : string;
}


interface ReserveContextType {
  data: ReserveData;
  setData: (data: Partial<ReserveData>) => void;
}

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const ReserveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setReserveData] = useState<ReserveData>({
  machineId: "",
  requestType: "",
  repairMethod: "정비소",
  location: "",
  latitude: undefined,
  longitude: undefined,
  repairDetail: "",   
  errorCode: "",
  errorType: undefined,  // ✅ 고장 유형 추가
  mediaUrl: "",       // ✅ 이미지/영상 URL 추가 (dataUrl도 가능)
  plateNumber: "", // ✅ 추가
  modelName: "",   // ✅ 추가
      
});



  const setData = (partial: Partial<ReserveData>) => {
    setReserveData((prev) => ({ ...prev, ...partial }));
  };

  return (
    <ReserveContext.Provider value={{ data, setData }}>
      {children}
    </ReserveContext.Provider>
  );
};

export const useReserve = () => {
  const context = useContext(ReserveContext);
  if (!context) throw new Error("useReserve must be used within ReserveProvider");
  return context;
};