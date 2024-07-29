import { NotificationContext } from '../context/notifications';
import { useContext } from 'react';

export function useNotifications() {
  const { notifications, setNotifications } = useContext(NotificationContext)
  
  return {notifications, setNotifications}
}