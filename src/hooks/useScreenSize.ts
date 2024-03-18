import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

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
