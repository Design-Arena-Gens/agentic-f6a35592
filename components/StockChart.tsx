'use client';

import { useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

interface StockChartProps {
  timeframe: string;
}

export default function StockChart({ timeframe }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Generate sample OHLC data
    const generateData = () => {
      const data = [];
      let basePrice = 2700;
      const periods = timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 252;

      for (let i = 0; i < periods; i++) {
        const open = basePrice + (Math.random() - 0.5) * 50;
        const close = open + (Math.random() - 0.5) * 100;
        const high = Math.max(open, close) + Math.random() * 30;
        const low = Math.min(open, close) - Math.random() * 30;
        data.push({ open, high, low, close, volume: Math.random() * 1000000 });
        basePrice = close;
      }
      return data;
    };

    const data = generateData();
    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartHeight = height - 100;
    const barWidth = (width - padding * 2) / data.length;

    // Find min and max
    const allPrices = data.flatMap((d) => [d.high, d.low]);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const priceRange = maxPrice - minPrice;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Price labels
      const price = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`₹${price.toFixed(0)}`, padding - 10, y + 4);
    }

    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = padding + index * barWidth + barWidth / 2;
      const openY =
        padding + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const closeY =
        padding + ((maxPrice - candle.close) / priceRange) * chartHeight;
      const highY =
        padding + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const lowY = padding + ((maxPrice - candle.low) / priceRange) * chartHeight;

      const isGreen = candle.close > candle.open;
      ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
      ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';

      // Draw wick
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY) || 1;
      const bodyWidth = Math.max(barWidth * 0.6, 1);
      ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    });

    // Draw volume bars
    const volumeHeight = 60;
    const volumeY = height - volumeHeight - 10;
    const maxVolume = Math.max(...data.map((d) => d.volume));

    data.forEach((candle, index) => {
      const x = padding + index * barWidth + barWidth / 2;
      const barHeight = (candle.volume / maxVolume) * volumeHeight;
      const isGreen = candle.close > candle.open;
      ctx.fillStyle = isGreen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
      ctx.fillRect(x - barWidth * 0.3, volumeY + volumeHeight - barHeight, barWidth * 0.6, barHeight);
    });

    // Volume label
    ctx.fillStyle = '#6b7280';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Volume', padding, volumeY - 5);

  }, [timeframe]);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex gap-2 z-10">
        <button
          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn size={18} className="text-gray-600" />
        </button>
        <button
          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut size={18} className="text-gray-600" />
        </button>
        <button
          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Pan chart"
          title="Pan chart"
        >
          <Move size={18} className="text-gray-600" />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: '400px' }}
        aria-label="Stock price candlestick chart"
        role="img"
      />
    </div>
  );
}
