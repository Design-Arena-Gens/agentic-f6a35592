'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<string>('RELIANCE');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-teal">
              Multibagger Stock Analyzer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden md:block px-4 py-2 text-sm font-semibold text-teal hover:bg-teal-50 rounded-lg">
              Profile
            </button>
            <button className="px-4 py-2 text-sm font-semibold bg-teal text-white rounded-lg hover:bg-teal-600">
              Upgrade
            </button>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 pb-4">
          <SearchBar onSelectStock={setSelectedStock} />
        </div>
      </header>

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedStock={selectedStock}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Dashboard selectedStock={selectedStock} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
