'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSelectStock: (stock: string) => void;
}

const INDIAN_STOCKS = [
  'RELIANCE - Reliance Industries Ltd',
  'TCS - Tata Consultancy Services',
  'HDFCBANK - HDFC Bank Ltd',
  'INFY - Infosys Ltd',
  'ICICIBANK - ICICI Bank Ltd',
  'HINDUNILVR - Hindustan Unilever Ltd',
  'BHARTIARTL - Bharti Airtel Ltd',
  'ITC - ITC Ltd',
  'SBIN - State Bank of India',
  'BAJFINANCE - Bajaj Finance Ltd',
  'ASIANPAINT - Asian Paints Ltd',
  'MARUTI - Maruti Suzuki India Ltd',
  'TITAN - Titan Company Ltd',
  'WIPRO - Wipro Ltd',
  'AXISBANK - Axis Bank Ltd',
  'ULTRACEMCO - UltraTech Cement Ltd',
  'NESTLEIND - Nestle India Ltd',
  'TATASTEEL - Tata Steel Ltd',
  'HCLTECH - HCL Technologies Ltd',
  'SUNPHARMA - Sun Pharmaceutical Industries',
];

export default function SearchBar({ onSelectStock }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = INDIAN_STOCKS.filter((stock) =>
        stock.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setFocusedIndex(-1);
  }, [query]);

  const handleSelect = (stock: string) => {
    const symbol = stock.split(' - ')[0];
    setQuery(stock);
    setShowSuggestions(false);
    onSelectStock(symbol);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && suggestions[focusedIndex]) {
        handleSelect(suggestions[focusedIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder="Search for Indian stocks (e.g., Reliance, TCS, HDFC Bank)..."
          className="w-full pl-12 pr-4 py-3 md:py-4 text-sm md:text-base border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
          aria-label="Search for stocks"
          aria-autocomplete="list"
          aria-controls="stock-suggestions"
          aria-expanded={showSuggestions}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="stock-suggestions"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto animate-fade-in"
        >
          {suggestions.map((stock, index) => {
            const [symbol, name] = stock.split(' - ');
            return (
              <button
                key={stock}
                role="option"
                aria-selected={index === focusedIndex}
                onClick={() => handleSelect(stock)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors ${
                  index === focusedIndex ? 'bg-teal-50' : ''
                } ${index === 0 ? 'rounded-t-xl' : ''} ${
                  index === suggestions.length - 1 ? 'rounded-b-xl' : ''
                }`}
              >
                <div className="font-semibold text-teal text-sm md:text-base">
                  {symbol}
                </div>
                <div className="text-gray-600 text-xs md:text-sm">{name}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
