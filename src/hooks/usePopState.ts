import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHistoryPopstate = (callback: () => void) => {
  const location = useLocation();

  useEffect(() => {
    const handlePopstate = () => {
      callback();
    };
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [callback, location.pathname]);
};

export default useHistoryPopstate;
