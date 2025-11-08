'use client';

import { Shield, Database, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Disclaimers */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-700 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
            <div>
              <h3 className="font-bold text-yellow-900 text-sm mb-1">Investment Disclaimer</h3>
              <p className="text-xs text-yellow-800">
                The information provided on this platform is for educational and informational purposes
                only. It does not constitute financial advice, investment recommendations, or an offer to
                buy or sell securities. Past performance is not indicative of future results. All
                investments carry risk, including the potential loss of principal. Please conduct your own
                research and consult with a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-start gap-3">
            <Database className="text-teal flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">Data Sources</h4>
              <p className="text-xs text-gray-600">
                BSE, NSE, Company filings, Reuters, Economic Times, Bloomberg
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="text-teal flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">Data Security</h4>
              <p className="text-xs text-gray-600">
                Industry-standard encryption and secure data handling practices
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="text-teal flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">Data Accuracy</h4>
              <p className="text-xs text-gray-600">
                Updated periodically. 15-minute delay for market data. Always verify independently.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-xs text-gray-600">
              © 2024 Multibagger Stock Analyzer. All rights reserved.
            </div>
            <nav className="flex flex-wrap gap-4 text-xs" aria-label="Footer navigation">
              <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                Data Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                Help & FAQ
              </a>
              <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Market data provided by BSE and NSE. News content aggregated from various sources.
          <br />
          This platform is not affiliated with SEBI or any stock exchange.
        </div>
      </div>
    </footer>
  );
}
