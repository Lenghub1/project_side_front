import { useState, useEffect } from "react";

type DebounceFunction = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
) => (...args: Parameters<F>) => void;

const useScreenSize = () => {
  /**
   * Debounce function to limit the rate at which a function is executed
   * This is particularly useful for events that can fire at a high rate, such as window resizing.
   * By using debounce, we ensure that our event handler is not called more often than the specified delay,
   * which can significantly improve performance and reduce lag.
   */

  const debounce: DebounceFunction = (func, wait) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function executedFunction(...args: any[]) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  };

  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      console.log("Hello");
      setScreenSize(window.innerWidth);
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenSize < 768;
  const isTablet = screenSize >= 768 && screenSize < 1024;
  const isDesktop = screenSize >= 1024;

  return { isMobile, isTablet, isDesktop };
};

export default useScreenSize;
