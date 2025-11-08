'use client';

import { useEffect, useRef } from 'react';

export default function FinancialMetrics() {
  const revenueCanvasRef = useRef<HTMLCanvasElement>(null);
  const marginsCanvasRef = useRef<HTMLCanvasElement>(null);
  const roeCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawLineChart(revenueCanvasRef.current, [45000, 52000, 61000, 73000, 84000], 'Revenue Growth (₹Cr)');
    drawBarChart(marginsCanvasRef.current,
      [
        { label: 'Gross', value: 42 },
        { label: 'Operating', value: 18 },
        { label: 'Net', value: 12 }
      ],
      'Profit Margins (%)'
    );
    drawBarChart(roeCanvasRef.current,
      [
        { label: 'ROE', value: 14.2 },
        { label: 'D/E', value: 0.45 }
      ],
      'Financial Ratios'
    );
  }, []);

  const drawLineChart = (canvas: HTMLCanvasElement | null, data: number[], title: string) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      const value = max - (range / 4) * i;
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(value.toLocaleString(), padding - 5, y + 4);
    }

    // Draw line
    ctx.strokeStyle = '#008080';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + ((max - value) / range) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#008080';
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + ((max - value) / range) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`FY${20 + index}`, x, height - 10);
    });
  };

  const drawBarChart = (canvas: HTMLCanvasElement | null, data: { label: string; value: number }[], title: string) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartHeight = height - padding * 2;
    const barWidth = (width - padding * 2) / data.length * 0.6;
    const spacing = (width - padding * 2) / data.length;

    const max = Math.max(...data.map(d => d.value));

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      const value = max - (max / 4) * i;
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(value.toFixed(1), padding - 5, y + 4);
    }

    // Draw bars
    const colors = ['#008080', '#10b981', '#3b82f6', '#8b5cf6'];
    data.forEach((item, index) => {
      const x = padding + spacing * index + (spacing - barWidth) / 2;
      const barHeight = (item.value / max) * chartHeight;
      const y = padding + chartHeight - barHeight;

      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Value on top
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.value.toFixed(1), x + barWidth / 2, y - 5);

      // Label
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px sans-serif';
      ctx.fillText(item.label, x + barWidth / 2, height - 10);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Revenue Growth (YoY)
        </h3>
        <canvas
          ref={revenueCanvasRef}
          className="w-full"
          style={{ height: '250px' }}
          aria-label="Revenue growth over 5 years"
          role="img"
        />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">5Y CAGR:</span>
          <span className="font-bold text-green-600">13.2%</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Profit Margins
        </h3>
        <canvas
          ref={marginsCanvasRef}
          className="w-full"
          style={{ height: '250px' }}
          aria-label="Profit margins breakdown"
          role="img"
        />
        <div className="mt-4 text-sm text-gray-600 text-center">
          Current fiscal year
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Key Ratios
        </h3>
        <canvas
          ref={roeCanvasRef}
          className="w-full"
          style={{ height: '250px' }}
          aria-label="ROE and Debt to Equity ratio"
          role="img"
        />
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">ROE</div>
            <div className="font-bold text-green-600">14.2%</div>
          </div>
          <div>
            <div className="text-gray-600">D/E Ratio</div>
            <div className="font-bold text-teal">0.45</div>
          </div>
        </div>
      </div>
    </div>
  );
}
