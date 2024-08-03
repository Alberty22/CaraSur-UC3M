import { createContext, useState, useEffect } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  
  const getInitialState = () => {
    const saved = localStorage.getItem('registeredActivities');
    return saved ? JSON.parse(saved) : [];
  };

  const [registeredActivities, setRegisteredActivities] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('registeredActivities', JSON.stringify(registeredActivities));
  }, [registeredActivities]);

  const toggleRegistration = (activityId) => {
    setRegisteredActivities(prevState =>
      prevState.includes(activityId)
        ? prevState.filter(id => id !== activityId)
        : [...prevState, activityId]
    );
  };

  return (
    <ActivityContext.Provider value={{ registeredActivities, toggleRegistration }}>
      {children}
    </ActivityContext.Provider>
  );
};