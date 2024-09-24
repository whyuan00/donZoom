import {create} from 'zustand';
import {validateSignup} from '@/utils/validate';

interface SignupState {
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
  setRole: (role: string) => void;
  validate: () => {email: string; password: string; passwordConfirm: string};
}

export const useSignupStore = create<SignupState>((set, get) => ({
  email: '',
  password: '',
  passwordConfirm: '',
  role: '',
  setEmail: email => set({email}),
  setPassword: password => set({password}),
  setPasswordConfirm: passwordConfirm => set({passwordConfirm}),
  setRole: role => set({role}),
  validate: () => {
    const {email, password, passwordConfirm} = get();
    return validateSignup({email, password, passwordConfirm});
  },
}));
