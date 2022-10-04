import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef<any>([]);

  const sendRequest = useCallback(
    async (url: RequestInfo, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl: any = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      console.log(url);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        console.log(responseData);

        activeHttpRequests.current.filter(
          (reqCtrl: any) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        console.log("error", err);

        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(undefined);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl: any) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
