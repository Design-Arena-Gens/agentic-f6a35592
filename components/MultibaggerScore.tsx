'use client';

import { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';

interface MultibaggerScoreProps {
  score: number;
}

export default function MultibaggerScore({ score }: MultibaggerScoreProps) {
  const [showModal, setShowModal] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displayScore < score) {
        setDisplayScore((prev) => Math.min(prev + 2, score));
      }
    }, 20);
    return () => clearTimeout(timer);
  }, [displayScore, score]);

  const getScoreColor = (s: number) => {
    if (s >= 75) return 'text-green-600';
    if (s >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (s: number) => {
    if (s >= 75) return 'from-green-400 to-green-600';
    if (s >= 50) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const factors = [
    {
      name: 'Market Size & Growth',
      score: 85,
      description:
        'Operating in large addressable market with 15%+ annual growth rate. Strong market positioning in high-growth sectors.',
      icon: '📈',
    },
    {
      name: 'Competitive Advantages',
      score: 72,
      description:
        'Strong brand moat, economies of scale, and established distribution network. Limited direct competition in core segments.',
      icon: '🛡️',
    },
    {
      name: 'Management Quality',
      score: 80,
      description:
        'Experienced leadership with proven track record. Transparent communication and shareholder-friendly policies.',
      icon: '👔',
    },
    {
      name: 'Financial Health',
      score: 75,
      description:
        'Consistent revenue growth, improving margins, and strong cash generation. Prudent debt management.',
      icon: '💰',
    },
    {
      name: 'Innovation & R&D',
      score: 68,
      description:
        'Investing in future technologies and product development. Building capabilities for next-generation offerings.',
      icon: '🔬',
    },
  ];

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Multibagger Potential
          </h3>
          <button
            onClick={() => setShowModal(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Show details"
          >
            <Info size={20} className="text-gray-600" />
          </button>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full flex flex-col items-center py-4 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label={`Multibagger score ${score} out of 100. Click for details`}
        >
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    className={
                      displayScore >= 75
                        ? 'text-green-400'
                        : displayScore >= 50
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }
                    stopColor="currentColor"
                  />
                  <stop
                    offset="100%"
                    className={
                      displayScore >= 75
                        ? 'text-green-600'
                        : displayScore >= 50
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }
                    stopColor="currentColor"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className={`text-5xl font-bold ${getScoreColor(displayScore)}`}>
                {displayScore}
              </div>
              <div className="text-sm text-gray-600 font-semibold">/ 100</div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div
              className={`text-lg font-bold ${
                displayScore >= 75
                  ? 'text-green-600'
                  : displayScore >= 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {displayScore >= 75
                ? 'High Potential'
                : displayScore >= 50
                ? 'Moderate Potential'
                : 'Low Potential'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Click for detailed breakdown
            </div>
          </div>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                Multibagger Potential Breakdown
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6">
                <div className="flex items-center justify-center gap-4">
                  <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900">
                      Overall Score
                    </div>
                    <div className="text-gray-600">
                      Based on 5 key factors
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {factors.map((factor, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden="true">
                          {factor.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {factor.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-sm font-semibold text-teal">
                              Score: {factor.score}/100
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-teal to-teal-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${factor.score}%` }}
                        role="progressbar"
                        aria-valuenow={factor.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{factor.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                  <Info size={18} />
                  Disclaimer
                </h3>
                <p className="text-sm text-yellow-800">
                  This score is generated using AI analysis and historical data.
                  It should not be considered as financial advice. Please conduct
                  your own research and consult with a financial advisor before
                  making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
