import { FetchState, UseFetchOptions } from "@/types/types";
import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch<T>() {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (url: string, options: UseFetchOptions = {}) => {
      const { headers = {} } = options;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setState({
          data,
          loading: false,
          error: null,
        });

        return data;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setState({
          data: null,
          loading: false,
          error: new Error(errorMessage),
        });

        throw error;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    fetchData,
  };
}
