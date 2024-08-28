import { UserLoansContext } from '../context/userLoans.jsx';
import { useContext } from 'react';

export function useUserLoans() {
  const { loans, setLoans } = useContext(UserLoansContext);
  
  return {loans, setLoans};
}