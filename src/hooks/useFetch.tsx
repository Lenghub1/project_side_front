import { useState, useEffect } from "react";
import { handleApiRequest } from "@/api";

/**
 * useFetchData hook for fetching data from an API
 *
 * @param {Function} apiRequest - Function that makes the API request
 * @returns {Object} An object containing data, error, and a function to trigger data fetching
 */
const useFetch = (apiRequest: () => Promise<any>) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    const [response, err] = await handleApiRequest(() => apiRequest());
    if (response) {
      setData(response);
      setError(null);
    } else {
      console.log(err);
      setData(null);
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, refetchData: fetchData };
};

export default useFetch;
