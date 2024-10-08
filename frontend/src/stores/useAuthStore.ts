import {create} from 'zustand';
import {validateSignup} from '@/utils/validate';

interface SignupState {
  id: number;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  name: string;
  nickname: string;
  setId: (id: number) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
  setRole: (role: string) => void;
  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  validate: () => {email: string; password: string; passwordConfirm: string};
  reset: () => void;
}

const initialState = {
  id: 0,
  email: '',
  password: '',
  passwordConfirm: '',
  role: '',
  name: '',
  nickname: '',
};

export const useSignupStore = create<SignupState>((set, get) => ({
  ...initialState,
  setId: id => set({id}),
  setEmail: email => set({email}),
  setPassword: password => set({password}),
  setPasswordConfirm: passwordConfirm => set({passwordConfirm}),
  setRole: role => set({role}),
  setName: name => set({name}),
  setNickname: nickname => set({nickname}),
  validate: () => {
    const {email, password, passwordConfirm} = get();
    return validateSignup({email, password, passwordConfirm});
  },
  reset: () => set(initialState),
}));
