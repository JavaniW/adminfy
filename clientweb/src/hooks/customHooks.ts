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

    const closeModal = useCallback((): void => {
        setVisible(false);
    }, [setVisible]);

    return [visible, closeModal];
  }

  export function useLoadingState(initialState: boolean | (() => boolean) = false): [boolean, () => void, () => void, React.Dispatch<boolean>] {
        const [loading, setLoading] = useState<boolean>(initialState);

        const startLoading = useCallback((): void => {
            setLoading(true);
        }, []);

        const doneLoading = useCallback((): void => {
            setLoading(false);
        }, []);

        return [loading, startLoading, doneLoading, setLoading];
    };