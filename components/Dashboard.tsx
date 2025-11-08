'use client';

import { useState } from 'react';
import MultibaggerScore from './MultibaggerScore';
import StockChart from './StockChart';
import FinancialMetrics from './FinancialMetrics';
import NewsFeed from './NewsFeed';
import RiskAssessment from './RiskAssessment';
import DataTable from './DataTable';

interface DashboardProps {
  selectedStock: string;
}

export default function Dashboard({ selectedStock }: DashboardProps) {
  const [timeframe, setTimeframe] = useState('1Y');

  return (
    <div className="space-y-6">
      {/* Stock Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {selectedStock}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {selectedStock === 'RELIANCE'
                ? 'Reliance Industries Ltd'
                : 'Company Name'}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">
              ₹2,847.50
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">+42.30</span>
              <span className="text-green-600">(+1.51%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multibagger Score & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MultibaggerScore score={78} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-xs md:text-sm text-gray-600 mb-1">
              Market Cap
            </div>
            <div className="text-lg md:text-xl font-bold text-gray-900">
              ₹19.2L Cr
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-xs md:text-sm text-gray-600 mb-1">P/E Ratio</div>
            <div className="text-lg md:text-xl font-bold text-gray-900">24.5</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-xs md:text-sm text-gray-600 mb-1">ROE</div>
            <div className="text-lg md:text-xl font-bold text-green-600">
              14.2%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-xs md:text-sm text-gray-600 mb-1">
              Debt/Equity
            </div>
            <div className="text-lg md:text-xl font-bold text-gray-900">0.45</div>
          </div>
        </div>
      </div>

      {/* Stock Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            Price Chart
          </h3>
          <div className="flex gap-2 flex-wrap">
            {['1M', '3M', '1Y', '5Y', 'Max'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                  timeframe === tf
                    ? 'bg-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={timeframe === tf}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <StockChart timeframe={timeframe} />
      </div>

      {/* Financial Metrics */}
      <FinancialMetrics />

      {/* News Feed and Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsFeed />
        <RiskAssessment />
      </div>

      {/* Data Table */}
      <DataTable />
    </div>
  );
}
