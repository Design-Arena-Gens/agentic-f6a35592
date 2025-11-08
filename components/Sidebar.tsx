'use client';

import {
  Home,
  TrendingUp,
  BookOpen,
  Settings,
  HelpCircle,
  User,
  Bell,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStock: string;
}

export default function Sidebar({ isOpen, onClose, selectedStock }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: TrendingUp, label: 'Watchlist', active: false },
    { icon: BookOpen, label: 'Research', active: false },
    { icon: Bell, label: 'Alerts', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help & FAQ', active: false },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-40
          w-64 lg:w-72 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
        aria-label="Main navigation"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between lg:hidden">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6 p-4 bg-teal-50 rounded-lg">
            <h3 className="text-xs font-semibold text-gray-600 mb-1">
              Currently Viewing
            </h3>
            <p className="text-lg font-bold text-teal">{selectedStock}</p>
          </div>

          <nav>
            <ul className="space-y-2" role="list">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                        ${
                          item.active
                            ? 'bg-teal text-white font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      <Icon size={20} aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-teal to-teal-600 rounded-lg p-4 text-white">
            <h3 className="font-bold text-sm mb-1">Upgrade to Pro</h3>
            <p className="text-xs mb-3 opacity-90">
              Get advanced analytics and unlimited alerts
            </p>
            <button className="w-full bg-white text-teal font-semibold py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
