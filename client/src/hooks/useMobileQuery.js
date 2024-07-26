import { useState, useEffect } from 'react';

function useMobileQuery(query) {
    const [isMobile, setIsMobile] = useState(window.matchMedia(query).matches);

    useEffect(() => {
      const mediaQueryList = window.matchMedia(query);
      const handleChange = () => setIsMobile(mediaQueryList.matches);
  
      handleChange(); 
  
      mediaQueryList.addEventListener('change', handleChange);

      return () => {
        mediaQueryList.removeEventListener('change', handleChange);
      };
    }, [query]);

    return isMobile 
}

export default useMobileQuery