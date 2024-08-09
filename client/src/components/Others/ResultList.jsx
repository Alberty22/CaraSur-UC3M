import './ResultList.css'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ResultItem = ({ result, onButtonClick, role})  => {

    
    const [userAdd, setUserAdd] = useState(false)

    useEffect(() => {
        setUserAdd(role === 'admin' ? true : false)
    }, [role])
    
    return (
      <div className='result-item'>
        <p>{result.email}</p>
        <button onClick={() => {setUserAdd(!userAdd), onButtonClick(result, !userAdd)}}>{userAdd ? '-' : '+'}</button>
      </div>
    );
  }

export function ResultList({ results, onButtonClick, all=false }) {

  const { t } = useTranslation()
  
  return (
    <div className='result-list'>
      { all &&
        <ResultItem result={{email: t('adminNotifications.all')}} role='' onButtonClick={onButtonClick} />

      }
      {results.map((result, index) => (
        <ResultItem key={index} result={result} role={result.role} onButtonClick={onButtonClick} />
      ))}
    </div>
  );
}

