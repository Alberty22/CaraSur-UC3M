import { ProfileContext } from '../context/profile';
import { useContext } from 'react';

export function useProfile() {
  const { userDetails, setUserDetails, fetchData, setfetchData } = useContext(ProfileContext)
  
  return {userDetails, setUserDetails, fetchData, setfetchData}
}