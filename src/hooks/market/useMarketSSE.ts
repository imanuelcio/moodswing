import { useEffect, useState, useRef, useCallback } from "react";

interface KlineData {
  open_time: string;
  close_time: string;
  open: string;
  high: string;
  low: string;
  close: string;
  base_volume: string;
  quote_volume: string;
  trades_count: number;
  is_closed: boolean;
}

interface BinanceSSEEvent {
  type: "kline.tick";
  interval: string;
  data: KlineData;
}

interface UseBinanceSSEOptions {
  marketId: string;
  enabled?: boolean;
  token?: string;
  onUpdate?: (data: BinanceSSEEvent) => void;
  onError?: (error: Error) => void;
}

export function useBinanceSSE({
  marketId,
  enabled = true,
  token,
  onUpdate,
  onError,
}: UseBinanceSSEOptions) {
  const [klineData, setKlineData] = useState<BinanceSSEEvent | null>(null);
  const [historicalData, setHistoricalData] = useState<KlineData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ CRITICAL FIX: Store callbacks in refs to prevent re-render loop
  const onUpdateRef = useRef(onUpdate);
  const onErrorRef = useRef(onError);

  // Update refs when callbacks change
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!enabled || !marketId) {
      console.log("⏸️ SSE disabled or no marketId");
      return;
    }

    const connectSSE = () => {
      try {
        if (eventSourceRef.current) {
          console.log("🔄 Closing existing connection...");
          eventSourceRef.current.close();
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        let url = `${apiUrl}/binance/markets/${marketId}`;

        if (token) {
          url += `?token=${encodeURIComponent(token)}`;
        }

        console.log("🔌 Connecting to Binance SSE:", url);
        const eventSource = new EventSource(url);

        eventSource.onopen = () => {
          console.log("✅ Binance SSE Connected");
          setIsConnected(true);
          setError(null);
        };

        // Use onmessage since backend doesn't send event name
        eventSource.onmessage = (event) => {
          try {
            const data: BinanceSSEEvent = JSON.parse(event.data);

            // Filter only kline.tick messages
            if (data.type === "kline.tick") {
              console.log("📊 Kline Update:", data);
              setKlineData(data);

              // Update historical data
              setHistoricalData((prev) => {
                const existingIndex = prev.findIndex(
                  (item) => item.open_time === data.data.open_time
                );

                if (existingIndex !== -1) {
                  const newData = [...prev];
                  newData[existingIndex] = data.data;
                  return newData.slice(-100);
                } else {
                  const newData = [...prev, data.data];
                  return newData.slice(-100);
                }
              });

              // ✅ Use ref instead of direct callback
              onUpdateRef.current?.(data);
            }
          } catch (err) {
            console.error("Failed to parse SSE message:", err, event.data);
          }
        };

        eventSource.onerror = (err) => {
          console.error("❌ Binance SSE Error:", err);
          setIsConnected(false);

          const error = new Error("Binance SSE connection failed");
          setError(error);

          // ✅ Use ref instead of direct callback
          onErrorRef.current?.(error);

          // Cleanup and attempt reconnect
          eventSource.close();
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("🔄 Attempting to reconnect Binance SSE...");
            connectSSE();
          }, 3000);
        };

        eventSourceRef.current = eventSource;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to connect Binance SSE");
        console.error("Failed to create EventSource:", error);
        setError(error);
        onErrorRef.current?.(error);
      }
    };

    console.log("🚀 Starting SSE connection...");
    connectSSE();

    // Cleanup
    return () => {
      console.log("🔌 Closing Binance SSE connection (cleanup)");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [marketId, enabled, token]); // ✅ FIXED: Remove onUpdate and onError from deps!

  // Helper functions
  const getCurrentPrice = useCallback(() => {
    return klineData ? parseFloat(klineData.data.close) : null;
  }, [klineData]);

  const getPriceChange = useCallback(() => {
    if (!klineData || historicalData.length < 2) return 0;

    const firstPrice = parseFloat(historicalData[0].open);
    const currentPrice = parseFloat(klineData.data.close);

    return ((currentPrice - firstPrice) / firstPrice) * 100;
  }, [klineData, historicalData]);

  return {
    klineData,
    historicalData,
    isConnected,
    error,
    getCurrentPrice,
    getPriceChange,
  };
}
