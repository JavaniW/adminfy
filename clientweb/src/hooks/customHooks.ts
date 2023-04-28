import { useEffect, useRef } from "react";

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