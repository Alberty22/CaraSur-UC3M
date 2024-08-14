import { UsersContext } from '../context/users.jsx';
import { useContext } from 'react';

export function useUsers() {
  const { users, setUsers } = useContext(UsersContext)
  
  return {users, setUsers}
}