import { useState, useEffect } from "react";

interface UrlParams {
  token?: string;
  id?: string;
  error?: string;
}

function useUrlParams() {
  const [params, setParams] = useState<UrlParams>({});

  useEffect(() => {
    const parseHashParams = (hash: string): UrlParams => {
      const queryStringStart = hash.indexOf("?");
      if (queryStringStart === -1) {
        return {};
      }
      const queryString = hash.substring(queryStringStart + 1);
      return Object.fromEntries(new URLSearchParams(queryString).entries());
    };

    const hashParams = parseHashParams(window.location.hash);
    setParams(hashParams);
  }, []);

  return params;
}

export default useUrlParams;
