import {create} from 'zustand';
import SunoPig from '@/assets/sunoPig.svg';
import Silhouette from '@/assets/silhouette.svg';

interface Pig {
  id: number;
  name: string;
  owned: boolean;
  description: string;
  image: any;
  silhouette: any;
}

interface PigHistory {
  id: number;
  name: string;
  date: string;
}

interface PigStore {
  pigs: Pig[];
  addOwnedPig: (pig: Pig) => void;
  pigHistory: PigHistory[];
  addPigHistory: (pig: Pig) => void;
  selectedCard: Pig | null;
  setSelectedCard: (pig: Pig | null) => void;
  selectedManyCards: Pig[] | null;
  setSelectedManyCards: (pigs: Pig[] | null) => void;
  isNewCard: boolean;
  setIsNewCard: (isNew: boolean) => void;
  isNewCards: boolean[];
  setIsNewCards: (newCards: boolean[]) => void;
  isManyDraws: boolean;
  setIsManyDraws: (isMany: boolean) => void;
}

export const usePigStore = create<PigStore>(set => ({
  // 더미데이터
  pigs: Array.from({length: 100}, (_, index) => ({
    id: index + 1,
    name: `돼지 ${index + 1}`,
    owned: false,
    description: `돼지 ${index + 1}에 대한 설명`,
    image: SunoPig,
    silhouette: Silhouette,
  })),
  addOwnedPig: pig =>
    set(state => ({
      pigs: state.pigs.map(p => (p.id === pig.id ? {...p, owned: true} : p)),
    })),
  pigHistory: [],
  addPigHistory: pig =>
    set(state => ({
      pigHistory: [
        ...state.pigHistory,
        {
          id: pig.id,
          name: pig.name,
          date: new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}),
        },
      ],
    })),
  selectedCard: null,
  setSelectedCard: pig => set({selectedCard: pig}),
  selectedManyCards: null,
  setSelectedManyCards: pigs => set({selectedManyCards: pigs}),
  isNewCard: false,
  setIsNewCard: isNew => set({isNewCard: isNew}),
  isNewCards: [],
  setIsNewCards: newCards => set({isNewCards: newCards}),
  isManyDraws: false,
  setIsManyDraws: isMany => set({isManyDraws: isMany}),
}));
