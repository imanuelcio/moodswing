import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

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

interface CryptoChartProps {
  data: KlineData[];
  currentKline?: KlineData;
  symbol: string;
  interval?: string;
  priceChange?: number;
  isConnected?: boolean;
}

export const CryptoChart = ({
  data,
  currentKline,
  symbol,
  interval = "1m",
  priceChange = 0,
  isConnected = false,
}: CryptoChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "transparent" },
        textColor: "#9CA3AF",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.3)" },
        horzLines: { color: "rgba(42, 46, 57, 0.3)" },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: "rgba(42, 46, 57, 0.5)",
      },
      timeScale: {
        borderColor: "rgba(42, 46, 57, 0.5)",
        timeVisible: true,
        secondsVisible: false,
        // ✅ Better bar spacing
        barSpacing: 12, // Space between bars (default 6)
        minBarSpacing: 8, // Minimum space when zoomed in
        rightOffset: 12, // Space on the right side
        fixLeftEdge: false,
        fixRightEdge: false,
      },
    });

    // Create candlestick series with new API
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22C55E",
      downColor: "#EF4444",
      borderUpColor: "#22C55E",
      borderDownColor: "#EF4444",
      wickUpColor: "#22C55E",
      wickDownColor: "#EF4444",
    });

    // Create volume series with new API
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  // Update chart data
  useEffect(() => {
    if (
      !candlestickSeriesRef.current ||
      !volumeSeriesRef.current ||
      data.length === 0
    )
      return;

    // Convert data to chart format
    const candlestickData: CandlestickData<Time>[] = data.map((kline) => ({
      time: (new Date(kline.open_time).getTime() / 1000) as Time,
      open: parseFloat(kline.open),
      high: parseFloat(kline.high),
      low: parseFloat(kline.low),
      close: parseFloat(kline.close),
    }));

    const volumeData = data.map((kline) => {
      const open = parseFloat(kline.open);
      const close = parseFloat(kline.close);
      return {
        time: (new Date(kline.open_time).getTime() / 1000) as Time,
        value: parseFloat(kline.base_volume),
        color:
          close >= open ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)",
      };
    });

    candlestickSeriesRef.current.setData(candlestickData);
    volumeSeriesRef.current.setData(volumeData);

    // ✅ Better fitting logic
    if (chartRef.current) {
      const timeScale = chartRef.current.timeScale();

      if (data.length < 20) {
        // If few candles, show them with good spacing
        timeScale.fitContent();
      } else {
        // If many candles, show last 30-50 bars
        const visibleBars = Math.min(50, data.length);
        const lastBar = candlestickData[candlestickData.length - 1];

        if (lastBar) {
          timeScale.setVisibleLogicalRange({
            from: candlestickData.length - visibleBars,
            to: candlestickData.length + 5, // Add some padding on right
          });
        }
      }
    }
  }, [data]);

  // Update current candle
  useEffect(() => {
    if (
      !candlestickSeriesRef.current ||
      !volumeSeriesRef.current ||
      !currentKline
    )
      return;

    const candleUpdate: CandlestickData<Time> = {
      time: (new Date(currentKline.open_time).getTime() / 1000) as Time,
      open: parseFloat(currentKline.open),
      high: parseFloat(currentKline.high),
      low: parseFloat(currentKline.low),
      close: parseFloat(currentKline.close),
    };

    const open = parseFloat(currentKline.open);
    const close = parseFloat(currentKline.close);
    const volumeUpdate = {
      time: (new Date(currentKline.open_time).getTime() / 1000) as Time,
      value: parseFloat(currentKline.base_volume),
      color:
        close >= open ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)",
    };

    candlestickSeriesRef.current.update(candleUpdate);
    volumeSeriesRef.current.update(volumeUpdate);
  }, [currentKline]);

  const currentPrice = currentKline ? parseFloat(currentKline.close) : 0;
  const priceChangeValue = priceChange || 0;

  return (
    <Card className="glass-card border-primary/30 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-orbitron flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Live Chart - {symbol}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${
                isConnected
                  ? "border-green-500/50 text-green-500"
                  : "border-red-500/50 text-red-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
              {isConnected ? "Live" : "Disconnected"}
            </Badge>
            <Badge variant="outline">{interval}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Price Info */}
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex items-baseline gap-4">
            <div className="text-4xl font-bold font-mono text-primary">
              $
              {currentPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <Badge
              variant="outline"
              className={`text-base ${
                priceChangeValue >= 0
                  ? "border-green-500/50 text-green-500"
                  : "border-red-500/50 text-red-500"
              }`}
            >
              {priceChangeValue >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(priceChangeValue).toFixed(2)}%
            </Badge>
          </div>
          {currentKline && (
            <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Open</div>
                <div className="font-mono">
                  ${parseFloat(currentKline.open).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">High</div>
                <div className="font-mono text-green-500">
                  ${parseFloat(currentKline.high).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Low</div>
                <div className="font-mono text-red-500">
                  ${parseFloat(currentKline.low).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Volume</div>
                <div className="font-mono">
                  {parseFloat(currentKline.base_volume).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chart Container */}
        <div
          ref={chartContainerRef}
          className="w-full rounded-lg overflow-hidden bg-background/50"
        />
      </CardContent>
    </Card>
  );
};
