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
  const {getAccount} = useAccount();

  const fetchAccount = async () => {
    setIsLoading(true);
    const accountData = await getAccount.refetch();
    // console.log('accountData:', accountData.data);
    if (accountData.isSuccess) {
      console.log('success:', accountData);
      setAccount(accountData.data ? accountData.data.rec[0].accountNo : '');
      fetchBalance(accountData.data ? accountData.data.rec[0].accountNo : '');
      setAccountName(accountData.data ? accountData.data.rec[0].userName : '');
    } else {
      console.log('failed:', accountData);
      setAccount('');
      fetchBalance('0');
      setAccountName('');
    }
  };

  const fetchBalance = async (accountNo: string) => {
    const accountData = await getAccount.refetch();
    setBalance(accountData.data ? accountData.data.rec[0].accountBalance : '');
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
