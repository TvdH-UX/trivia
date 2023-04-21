import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const result = await fetch(url).then((response) => response);
      if (!result.ok) {
        throw new Error(`Could not fetch questions`);
      }
      const data = await result.json();
      setData(data);
    } catch (error) {
      alert(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};
