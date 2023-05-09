import { useCallback, useEffect, useRef, useState } from 'react';

export function useOutsideClick (callback : any) {
    const ref:any = useRef();
  
    useEffect(() => {
      const handleClick = (event : Event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
          }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [callback, ref]);
  
    return ref;
  };

  export function useModalHooks() : [boolean, () => void] {
    const [visible, setVisible] = useState<boolean>(true);

    const closeDrawer = useCallback((): void => {
        setVisible(false);
    }, [setVisible]);

    return [visible, closeDrawer];
  }