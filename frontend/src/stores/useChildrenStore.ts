import {create} from 'zustand';
import {Child} from '@/types/domain';

interface ChildrenStore {
  myChildren: Child[];
  setMyChildren: (myChildren: Child[]) => void;
  resetChildren: () => void;
}

export const useChildrenStore = create<ChildrenStore>(set => ({
  myChildren: [],
  setMyChildren: (myChildren: Child[]) => set({myChildren}),
  resetChildren: () =>
    set({
      myChildren: [],
    }),
}));
