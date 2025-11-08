'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export default function RiskAssessment() {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);

  const risks = [
    {
      title: 'Industry Disruption',
      level: 'medium',
      icon: '⚡',
      summary: 'Emerging technologies could disrupt traditional business models',
      details:
        'New entrants with innovative technologies and business models pose a threat to market share. The company is investing in R&D to stay competitive, but execution risks remain. Digital transformation initiatives are underway but require significant capital investment.',
      mitigation:
        'Company has allocated 8% of revenue to R&D and formed strategic partnerships with tech leaders.',
    },
    {
      title: 'Regulatory Changes',
      level: 'low',
      icon: '⚖️',
      summary: 'New environmental and compliance regulations on the horizon',
      details:
        'Upcoming environmental regulations may require additional capex for compliance. Government policy changes could impact import/export dynamics and raw material costs. GST rate modifications under consideration.',
      mitigation:
        'Proactive engagement with regulators and early compliance investments reduce impact.',
    },
    {
      title: 'Management Succession',
      level: 'medium',
      icon: '👥',
      summary: 'Key leadership transitions planned in next 18 months',
      details:
        'CEO succession planning underway as current leadership approaches retirement. Second-tier management being groomed but institutional knowledge transfer is critical. Board composition changes expected.',
      mitigation:
        'Structured succession plan with 2-year transition period and retention of advisory roles.',
    },
    {
      title: 'Commodity Price Volatility',
      level: 'high',
      icon: '📊',
      summary: 'Raw material costs subject to global price fluctuations',
      details:
        'Heavy dependence on imported crude oil and petrochemicals exposes margins to currency and commodity risks. Limited pricing power in competitive segments restricts ability to pass through costs.',
      mitigation:
        'Hedging strategies in place covering 60% of exposure. Working on backward integration.',
    },
    {
      title: 'Geopolitical Risks',
      level: 'medium',
      icon: '🌍',
      summary: 'International operations exposed to regional instabilities',
      details:
        'Operations in emerging markets face political risks and currency volatility. Trade tensions between major economies could impact supply chains. Sanctions and export controls add complexity.',
      mitigation:
        'Geographic diversification strategy and local manufacturing reducing dependencies.',
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getRiskIndicatorColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskLabel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1) + ' Risk';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="text-yellow-600" size={20} aria-hidden="true" />
          Risk Assessment
        </h3>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true"></div>
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true"></div>
            <span className="text-gray-600">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></div>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg overflow-hidden transition-all ${getRiskColor(
              risk.level
            )}`}
          >
            <button
              onClick={() => setExpandedRisk(expandedRisk === index ? null : index)}
              className="w-full p-4 text-left hover:bg-opacity-70 transition-all"
              aria-expanded={expandedRisk === index}
              aria-controls={`risk-details-${index}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${getRiskIndicatorColor(
                    risk.level
                  )} flex items-center justify-center flex-shrink-0`}
                  aria-label={getRiskLabel(risk.level)}
                >
                  <span className="text-lg" aria-hidden="true">
                    {risk.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">
                        {risk.title}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-700 mt-1">
                        {risk.summary}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedRisk === index ? (
                        <ChevronUp size={20} className="text-gray-600" aria-hidden="true" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-600" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {expandedRisk === index && (
              <div
                id={`risk-details-${index}`}
                className="px-4 pb-4 animate-fade-in"
              >
                <div className="ml-11 space-y-3 text-sm">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Details:</h5>
                    <p className="text-gray-700">{risk.details}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">
                      Mitigation Strategy:
                    </h5>
                    <p className="text-gray-700">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs md:text-sm text-blue-900">
          <strong>Note:</strong> Risk assessment is based on current market conditions and
          company disclosures. Risk levels may change rapidly based on external factors.
          Always conduct your own due diligence.
        </p>
      </div>
    </div>
  );
}
