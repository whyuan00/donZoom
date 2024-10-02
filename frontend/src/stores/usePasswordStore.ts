import {create} from 'zustand';

interface AccountState {
  password: string;
  setPassword: (password: string) => void;
}

const initialState = {
  password: '',
};

const usePasswordStore = create<AccountState>(set => ({
  ...initialState,
  setPassword: password => set({password}),
}));

export default usePasswordStore;
