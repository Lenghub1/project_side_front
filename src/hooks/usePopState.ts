import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHistoryPopstate = (callback: () => void) => {
  const location = useLocation();

  useEffect(() => {
    const handlePopstate = () => {
      console.log("Popstate event detected.");
      callback();
    };
    console.log("Chnaging location");
    window.addEventListener("popstate", handlePopstate);
    console.log("Chnaging location2");

    return () => {
      console.log("Removing popstate event listener.");
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [callback, location.pathname]);
};

export default useHistoryPopstate;
