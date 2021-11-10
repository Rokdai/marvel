import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-type": "application/json" }
    ) => {
      setLoading(true);

      try {
        const response = await fetch(url, { method, body, headers });
        setLoading(false);
        return await response.json();
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
