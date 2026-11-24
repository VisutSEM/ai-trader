'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Candle } from '@/types/trading';

interface TradingChartProps {
  candles: Candle[];
  symbol: string;
  chartType: 'candles' | 'line';
  showIndicators: boolean;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  candles,
  symbol,
  chartType,
  showIndicators,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  // Compute Moving Averages
  const ma20 = useMemo(() => {
    if (!showIndicators || candles.length < 20) return [];
    const res: (number | null)[] = [];
    for (let i = 0; i < candles.length; i++) {
      if (i < 19) {
        res.push(null);
      } else {
        const slice = candles.slice(i - 19, i + 1);
        const avg = slice.reduce((acc, c) => acc + c.close, 0) / 20;
        res.push(avg);
      }
    }
    return res;
  }, [candles, showIndicators]);

  const ma50 = useMemo(() => {
    if (!showIndicators || candles.length < 50) return [];
    const res: (number | null)[] = [];
    for (let i = 0; i < candles.length; i++) {
      if (i < 49) {
        res.push(null);
      } else {
        const slice = candles.slice(i - 49, i + 1);
        const avg = slice.reduce((acc, c) => acc + c.close, 0) / 50;
        res.push(avg);
      }
    }
    return res;
  }, [candles, showIndicators]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Layout dimensions
    const priceScaleWidth = 65;
    const timeScaleHeight = 26;
    const plotWidth = width - priceScaleWidth;
    const plotHeight = height - timeScaleHeight;
    const volumeHeight = plotHeight * 0.22;
    const mainChartHeight = plotHeight - volumeHeight;

    // Calculate Min & Max Prices
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVol = 0;

    for (const c of candles) {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    }

    // Add padding to price range
    const priceRange = maxPrice - minPrice || 1;
    minPrice -= priceRange * 0.05;
    maxPrice += priceRange * 0.05;
    const finalRange = maxPrice - minPrice;

    // Scale helpers
    const getY = (val: number) => {
      return mainChartHeight - ((val - minPrice) / finalRange) * mainChartHeight;
    };
    const getPriceFromY = (y: number) => {
      return maxPrice - (y / mainChartHeight) * finalRange;
    };

    const candleCount = candles.length;
    const candleWidth = Math.max(2, (plotWidth / candleCount) * 0.7);
    const stepX = plotWidth / candleCount;

    // 1. Draw Grid Lines
    ctx.strokeStyle = '#141d2a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const horizontalGridSteps = 6;
    for (let i = 0; i <= horizontalGridSteps; i++) {
      const y = (mainChartHeight / horizontalGridSteps) * i;
      ctx.moveTo(0, y);
      ctx.lineTo(plotWidth, y);
    }
    const verticalGridSteps = 8;
    for (let i = 0; i <= verticalGridSteps; i++) {
      const x = (plotWidth / verticalGridSteps) * i;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, plotHeight);
    }
    ctx.stroke();

    // 2. Draw Volume Bars
    candles.forEach((c, i) => {
      const x = i * stepX + stepX / 2;
      const vHeight = (c.volume / (maxVol || 1)) * volumeHeight;
      const vY = plotHeight - vHeight;
      const isUp = c.close >= c.open;

      ctx.fillStyle = isUp ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)';
      ctx.fillRect(x - candleWidth / 2, vY, candleWidth, vHeight);
    });

    // 3. Draw Chart (Candles or Line)
    if (chartType === 'line') {
      // Line / Area chart
      ctx.beginPath();
      candles.forEach((c, i) => {
        const x = i * stepX + stepX / 2;
        const y = getY(c.close);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Area gradient
      const grad = ctx.createLinearGradient(0, 0, 0, mainChartHeight);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
      ctx.lineTo((candles.length - 1) * stepX + stepX / 2, mainChartHeight);
      ctx.lineTo(stepX / 2, mainChartHeight);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    } else {
      // Candlesticks
      candles.forEach((c, i) => {
        const x = i * stepX + stepX / 2;
        const openY = getY(c.open);
        const closeY = getY(c.close);
        const highY = getY(c.high);
        const lowY = getY(c.low);
        const isUp = c.close >= c.open;

        const color = isUp ? '#10b981' : '#ef4444';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1.2;

        // Draw Wick
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Draw Body
        const top = Math.min(openY, closeY);
        const bodyHeight = Math.max(2, Math.abs(closeY - openY));
        ctx.fillRect(x - candleWidth / 2, top, candleWidth, bodyHeight);
      });
    }

    // 4. Draw Moving Averages (EMA 20 & EMA 50)
    if (showIndicators) {
      if (ma20.length > 0) {
        ctx.strokeStyle = '#f59e0b'; // Amber
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        let started = false;
        ma20.forEach((val, i) => {
          if (val !== null) {
            const x = i * stepX + stepX / 2;
            const y = getY(val);
            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
        });
        ctx.stroke();
      }

      if (ma50.length > 0) {
        ctx.strokeStyle = '#38bdf8'; // Sky blue
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        let started = false;
        ma50.forEach((val, i) => {
          if (val !== null) {
            const x = i * stepX + stepX / 2;
            const y = getY(val);
            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
        });
        ctx.stroke();
      }
    }

    // 5. Draw Current Price Guideline
    const lastCandle = candles[candles.length - 1];
    const lastPriceY = getY(lastCandle.close);
    ctx.strokeStyle = '#3b82f6';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, lastPriceY);
    ctx.lineTo(plotWidth, lastPriceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Right-side current price tag
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(plotWidth, lastPriceY - 10, priceScaleWidth, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(lastCandle.close.toFixed(2), plotWidth + priceScaleWidth / 2, lastPriceY + 3);

    // 6. Draw Price Scale (Y-Axis)
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    for (let i = 0; i <= horizontalGridSteps; i++) {
      const y = (mainChartHeight / horizontalGridSteps) * i;
      const p = getPriceFromY(y);
      ctx.fillText(p.toFixed(2), plotWidth + 6, y + 3);
    }

    // 7. Draw Time Scale (X-Axis)
    ctx.textAlign = 'center';
    for (let i = 0; i <= verticalGridSteps; i++) {
      const index = Math.floor((candles.length / verticalGridSteps) * i);
      if (candles[index]) {
        const x = (plotWidth / verticalGridSteps) * i;
        const date = new Date(candles[index].time * 1000);
        const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        ctx.fillText(timeStr, x, plotHeight + 16);
      }
    }

    // 8. Draw Crosshair on Hover
    if (hoverPos && hoverIndex !== null && hoverIndex >= 0 && hoverIndex < candles.length) {
      const hX = hoverIndex * stepX + stepX / 2;
      const hY = hoverPos.y;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.setLineDash([3, 3]);

      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(hX, 0);
      ctx.lineTo(hX, plotHeight);
      ctx.stroke();

      // Horizontal crosshair
      ctx.beginPath();
      ctx.moveTo(0, hY);
      ctx.lineTo(plotWidth, hY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Crosshair Price Badge
      const hoverPrice = getPriceFromY(hY);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(plotWidth, hY - 10, priceScaleWidth, 20);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(hoverPrice.toFixed(2), plotWidth + priceScaleWidth / 2, hY + 3);

      // Crosshair Time Badge
      const hCandle = candles[hoverIndex];
      const hDate = new Date(hCandle.time * 1000);
      const hTimeStr = `${hDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${hDate.getHours().toString().padStart(2, '0')}:${hDate.getMinutes().toString().padStart(2, '0')}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(hX - 45, plotHeight + 2, 90, 18);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(hTimeStr, hX, plotHeight + 15);
    }
  }, [candles, chartType, showIndicators, hoverIndex, hoverPos, ma20, ma50]);

  // Mouse hover handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const plotWidth = rect.width - 65;
    const stepX = plotWidth / candles.length;
    const index = Math.min(candles.length - 1, Math.max(0, Math.floor(x / stepX)));

    setHoverIndex(index);
    setHoverPos({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setHoverPos(null);
  };

  const activeCandle = hoverIndex !== null && candles[hoverIndex] ? candles[hoverIndex] : candles[candles.length - 1];
  const candleChange = activeCandle ? ((activeCandle.close - activeCandle.open) / activeCandle.open) * 100 : 0;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#0a0e16] flex flex-col select-none">
      {/* Floating Chart HUD Header */}
      {activeCandle && (
        <div className="absolute top-2 left-3 z-10 flex flex-wrap items-center gap-3 text-[11px] font-mono pointer-events-none bg-[#0e141f]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-[#1e2a3c]">
          <span className="font-bold text-slate-200">{symbol}</span>
          <span className="text-slate-400">
            O: <span className="text-slate-100">{activeCandle.open.toFixed(2)}</span>
          </span>
          <span className="text-slate-400">
            H: <span className="text-slate-100">{activeCandle.high.toFixed(2)}</span>
          </span>
          <span className="text-slate-400">
            L: <span className="text-slate-100">{activeCandle.low.toFixed(2)}</span>
          </span>
          <span className="text-slate-400">
            C: <span className="text-slate-100">{activeCandle.close.toFixed(2)}</span>
          </span>
          <span className="text-slate-400">
            Vol: <span className="text-slate-100">{activeCandle.volume.toLocaleString()}</span>
          </span>
          <span className={`font-semibold ${candleChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {candleChange >= 0 ? '+' : ''}
            {candleChange.toFixed(2)}%
          </span>
          {showIndicators && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <span className="text-amber-400">EMA 20</span>
              <span className="text-sky-400">EMA 50</span>
            </div>
          )}
        </div>
      )}

      {/* Main Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-crosshair"
      />
    </div>
  );
};
