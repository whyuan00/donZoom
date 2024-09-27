import {create} from 'zustand';

interface AccountState {
  accountNo: string;
  amount: string;
  name: string;
  setAccountNo: (accountNo: string) => void;
  setAmount: (amount: string) => void;
  setName: (name: string) => void;
}

const useTransferStore = create<AccountState>(set => ({
  accountNo: '',
  amount: '0',
  name: '',
  setAccountNo: accountNo => set({accountNo}),
  setAmount: amount => set({amount}),
  setName: name => set({name}),
}));

export default useTransferStore;
