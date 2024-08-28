import { ProfileContext } from '../context/profile';
import { useContext } from 'react';

export function useProfile() {
  const { userDetails, setfetchData, adminDetails, setfetchAdmin } = useContext(ProfileContext);
  
  return {userDetails, setfetchData, adminDetails, setfetchAdmin};
}