import { useState, useEffect } from "react";

function useRefetchOnMount(resetFunction: () => void) {
  // state to track if the component has been initialized
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * trigger a data refetch request
   * SOURCE: https://github.com/facebookexperimental/Recoil/issues/85
   */
  useEffect(() => {
    if (isInitialized) {
      resetFunction();
    } else {
      setIsInitialized(true);
    }
  }, [resetFunction, isInitialized]);
}

export default useRefetchOnMount;
