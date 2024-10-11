import {create} from 'zustand';

interface ChildProfile {
  id: number;
  name: string;
  email: string;
  nickname: string;
  balance?: number;

}


type ChildIdState = {
  id: number | null; // 현재 선택된 아이의 ID
  setChildId: (id: number) => void; // ID를 설정하는 함수
  getChildId: () => number | null; // ID를 반환하는 함수
  children: ChildProfile[]; // 아이 프로필을 저장하는 배열
  setChildren: (children: ChildProfile[]) => void; // 아이 프로필을 설정하는 함수
  getChildren: () => ChildProfile[]; // 아이 프로필을 반환하는 함수

};

const useMissionStore = create<ChildIdState>((set, get) => ({
  id: null, // 초기 상태
  setChildId: (id: number) => set({id}), // 상태를 업데이트하는 함수
  getChildId: () => get().id, // 상태에서 id 값을 반환하는 함수
  children: [], // 아이 프로필 배열 초기화
  setChildren: (children: ChildProfile[]) => set({children}), // 아이 프로필을 설정하는 함수
  getChildren: () => get().children, // 아이 프로필을 반환하는 함수

}));

export default useMissionStore;
