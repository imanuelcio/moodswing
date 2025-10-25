import { useEffect, useState, useRef } from "react";

interface PriceUpdate {
  symbol: string;
  priceId: string;
  source: string;
  price: string;
  conf: string;
  ts: string;
}

interface UseMarketSSEOptions {
  marketId: string;
  enabled?: boolean;
  token?: string;
  onUpdate?: (data: PriceUpdate) => void;
  onError?: (error: Error) => void;
}

export function useMarketSSE({
  marketId,
  enabled = true,
  token,
  onUpdate,
  onError,
}: UseMarketSSEOptions) {
  const [priceData, setPriceData] = useState<PriceUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || !marketId) return;

    const connectSSE = () => {
      try {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        let url = `${apiUrl}/sse/markets/${marketId}`;

        if (token) {
          url += `?token=${encodeURIComponent(token)}`;
        }

        const eventSource = new EventSource(url);

        eventSource.onopen = () => {
          setIsConnected(true);
          setError(null);
        };

        // ⭐ PENTING: Listen ke event "price" (bukan default onmessage)
        eventSource.addEventListener("price", (event) => {
          try {
            const data: PriceUpdate = JSON.parse(event.data);
            setPriceData(data);
            onUpdate?.(data);
          } catch (err) {
            console.error("Failed to parse price event:", err, event.data);
          }
        });

        // Optional: Listen ke event "connected" jika ada
        // eventSource.addEventListener("connected", (event) => {
        //   console.log("📡 Connected event:", event.data);
        // });

        // Fallback: Default message handler (jika ada message tanpa event name)
        eventSource.onmessage = (event) => {
          try {
            const data: PriceUpdate = JSON.parse(event.data);
            setPriceData(data);
            onUpdate?.(data);
          } catch (err) {
            console.error("Failed to parse SSE message:", err);
          }
        };

        eventSource.onerror = (err) => {
          console.error("❌ SSE Error:", err);
          setIsConnected(false);

          const error = new Error("SSE connection failed");
          setError(error);
          onError?.(error);

          // Cleanup and attempt reconnect after 3 seconds
          eventSource.close();
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("🔄 Attempting to reconnect SSE...");
            connectSSE();
          }, 3000);
        };

        eventSourceRef.current = eventSource;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to connect SSE");
        setError(error);
        onError?.(error);
      }
    };

    connectSSE();

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [marketId, enabled, token, onUpdate, onError]);

  return {
    priceData,
    isConnected,
    error,
  };
}
