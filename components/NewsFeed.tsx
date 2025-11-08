'use client';

import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';

export default function NewsFeed() {
  const news = [
    {
      title: 'Q4 Results Beat Estimates with Strong Revenue Growth',
      source: 'Economic Times',
      time: '2 hours ago',
      sentiment: 'positive',
      summary: 'Company reports 18% YoY revenue growth, exceeding analyst expectations.',
      url: '#',
    },
    {
      title: 'Regulatory Approval for New Manufacturing Facility',
      source: 'Business Standard',
      time: '5 hours ago',
      sentiment: 'positive',
      summary: 'Government approves expansion plans for new production unit in Gujarat.',
      url: '#',
    },
    {
      title: 'Global Supply Chain Disruptions Impact Q1 Outlook',
      source: 'Reuters',
      time: '1 day ago',
      sentiment: 'neutral',
      summary: 'Management addresses concerns about raw material availability.',
      url: '#',
    },
    {
      title: 'Market Competition Intensifies in Core Segment',
      source: 'Moneycontrol',
      time: '1 day ago',
      sentiment: 'negative',
      summary: 'New entrants putting pressure on market share and pricing power.',
      url: '#',
    },
    {
      title: 'Strategic Partnership with Global Tech Leader',
      source: 'Mint',
      time: '2 days ago',
      sentiment: 'positive',
      summary: 'Collaboration to develop next-generation products for emerging markets.',
      url: '#',
    },
    {
      title: 'SEBI Filing: Promoter Increases Stake by 2%',
      source: 'BSE',
      time: '3 days ago',
      sentiment: 'positive',
      summary: 'Promoter confidence shown through open market purchases.',
      url: '#',
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="text-green-600" size={18} />;
      case 'negative':
        return <TrendingDown className="text-red-600" size={18} />;
      default:
        return <Minus className="text-yellow-600" size={18} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    return sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">News & Updates</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></div>
            <span className="text-gray-600">Positive</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true"></div>
            <span className="text-gray-600">Neutral</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true"></div>
            <span className="text-gray-600">Negative</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {news.map((item, index) => (
          <article
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow card-hover"
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-full border ${getSentimentColor(
                  item.sentiment
                )}`}
                aria-label={`${getSentimentLabel(item.sentiment)} sentiment`}
              >
                {getSentimentIcon(item.sentiment)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.source}</span>
                    <span>•</span>
                    <time>{item.time}</time>
                  </div>
                  <a
                    href={item.url}
                    className="flex items-center gap-1 text-teal hover:underline"
                    aria-label={`Read more about ${item.title}`}
                  >
                    <span>Read</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-semibold text-teal hover:bg-teal-50 rounded-lg transition-colors">
        Load More News
      </button>
    </div>
  );
}
