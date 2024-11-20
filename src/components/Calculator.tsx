import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, Calculator as CalcIcon, Percent } from 'lucide-react';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.91 },
  AUD: { symbol: 'A$', rate: 1.53 }
};

export default function Calculator() {
  const [dailyHours, setDailyHours] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [currency, setCurrency] = useState('USD');
  
  const timeSaved = dailyHours * 0.8;
  const moneySaved = timeSaved * hourlyRate;
  
  const getConvertedAmount = (amount: number, curr: string) => {
    return (amount / currencies[curr as keyof typeof currencies].rate).toFixed(2);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">AI Voice Agent ROI Calculator</h2>
          <p className="text-gray-600">Calculate your potential savings with AI automation</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
            <div className="space-y-4">
              <label className="block">
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Daily Phone Hours
                </span>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="mt-1 text-center font-semibold text-blue-600">
                  {dailyHours} hours
                </div>
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Hourly Rate
                </span>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  <CalcIcon className="w-5 h-5 text-purple-600" />
                  Currency
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.keys(currencies).map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Time Saved Daily
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {timeSaved.toFixed(1)} hours
                </div>
                <div className="text-sm text-gray-500">
                  {(timeSaved / dailyHours * 100).toFixed(0)}% of your time reclaimed
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Daily Savings
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {currencies[currency as keyof typeof currencies].symbol}{getConvertedAmount(moneySaved, currency)}
                </div>
                <div className="text-sm text-gray-500">
                  Monthly: {currencies[currency as keyof typeof currencies].symbol}{(getConvertedAmount(moneySaved * 22, currency))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Percent className="w-5 h-5 text-purple-600" />
                  Efficiency Gain
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  80%
                </div>
                <div className="text-sm text-gray-500">
                  Tasks automated by AI
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          * Calculations based on industry standard automation rates and current exchange rates
        </div>
      </div>
    </div>
  );
}