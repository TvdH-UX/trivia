import { useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setIsLoading(true);
    let result = await fetch(url)
      .then((result) => {
        setIsLoading(false);
        if (!result.ok) {
          throw new Error(`Could not fetch questions`);
        }
        return result.json();
      })
      .catch((err) => {
        alert(error.message);
        setError(err);
      });
    setData(result);
  };
  return { data, isLoading, error, fetchData };
};
