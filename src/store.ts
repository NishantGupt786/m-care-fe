import { create } from "zustand";

interface profResponse {
  data: {
    name: string;
    email: string;
    phoneNo: string;
    isVerified?: boolean;
    dob: string;
    q1: boolean;
    q2: boolean;
    q3: string;
  };
}

export const useProfileStore = create<profResponse>((set) => ({
  data: {
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    q1: false,
    q2: false,
    q3: "",
  },
  setData: (dataTemp: any) =>
    set((state) => ({
      ...state,
      teamData: dataTemp,
    })),
}));
