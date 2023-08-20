import { useCallback, useEffect, useRef, useState } from "react";
import { ScreenSize } from "../enums/ScreenSize";

export function useOutsideClick(callback: any) {
  const ref: any = useRef();

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback, ref]);

  return ref;
}

export function useModalHooks(): [boolean, (x: boolean) => void, () => void] {
  const [visible, setVisible] = useState<boolean>(false);

  const closeModal = useCallback((): void => {
    setVisible(false);
  }, [setVisible]);

  return [visible, setVisible, closeModal];
}

export function useLoadingState(
  initialState: boolean | (() => boolean) = false
): [boolean, () => void, () => void, React.Dispatch<boolean>] {
  const [loading, setLoading] = useState<boolean>(initialState);

  const startLoading = useCallback((): void => {
    setLoading(true);
  }, []);

  const doneLoading = useCallback((): void => {
    setLoading(false);
  }, []);

  return [loading, startLoading, doneLoading, setLoading];
}

export function usePagination<T>(data?: T[] | undefined, limit?: number) {
  const [_limit, setLimit] = useState<number>(limit ?? 8);
  const [page, setPage] = useState<number>(0);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  const first_element_idx = 0 + page * _limit;

  if (!data) return [[] as T[], setLimit, setPage, page];

  setPaginatedData(data.slice(0 + page * _limit, first_element_idx + _limit));
  return [paginatedData, setPaginatedData, setLimit, setPage, page];
}

export function useScreenSize(): ScreenSize {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleWindowResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  if (screenWidth >= 600) return ScreenSize.Small;
  if (screenWidth >= 900) return ScreenSize.Medium;
  if (screenWidth >= 1200) return ScreenSize.Large;
  if (screenWidth >= 1536) return ScreenSize.ExtraLarge;
  return ScreenSize.ExtraSmall;
}
