import {useState, useEffect} from 'react';
import useAccount from './queries/useAccount';

interface AccountBalanceHook {
  account: string;
  balance: string;
  name: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useAccountBalance(): AccountBalanceHook {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {getAccount, getBalance} = useAccount();

  const fetchAccount = () => {
    setIsLoading(true);
    setAccount(getAccount.data ? getAccount.data.rec[0].accountNo : '');
    fetchBalance(getAccount.data ? getAccount.data.rec[0].accountNo : '');
    setAccountName(getAccount.data ? getAccount.data.rec[0].userName : '');
  };

  const fetchBalance = (accountNo: string) => {
    setBalance(getAccount.data ? getAccount.data.rec[0].accountBalance : '');
    setIsLoading(false);
  };

  const refetch = () => {
    fetchAccount();
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return {account, balance, name: accountName, isLoading, error, refetch};
}

export default useAccountBalance;
