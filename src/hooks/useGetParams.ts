import { useState, useEffect } from "react";

interface UrlParams {
  token?: string;
  id?: string;
  error?: string;
}

// Hook to get URL parameters
function useUrlParams() {
  const [params, setParams] = useState<UrlParams>({});

  useEffect(() => {
    // Function to parse hash parameters from URL
    const parseHashParams = (hash: string): UrlParams => {
      // Check if the hash contains '?'
      const queryStringStart = hash.indexOf("?");
      if (queryStringStart === -1) {
        return {};
      }
      // Extract the query string from the hash and parse it
      const queryString = hash.substring(queryStringStart + 1);
      return Object.fromEntries(new URLSearchParams(queryString).entries());
    };

    // Parse the URL parameters and set them to state
    const hashParams = parseHashParams(window.location.hash);
    setParams(hashParams);
  }, []);

  return params;
}

export default useUrlParams;
