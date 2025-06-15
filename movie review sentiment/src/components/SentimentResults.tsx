import React from 'react';
import { TrendingUp, Loader2 } from 'lucide-react';
import type { SentimentResult } from '../types/sentiment';

interface SentimentResultsProps {
  result: SentimentResult | null;
  isAnalyzing: boolean;
}

const SentimentResults: React.FC<SentimentResultsProps> = ({ result, isAnalyzing }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const getSentimentBgColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-400';
      case 'negative': return 'bg-red-400';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Analysis Results
      </h2>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
          <p className="text-blue-200 text-lg">Processing your review...</p>
          <p className="text-blue-300 text-sm mt-2">Using advanced AI sentiment analysis</p>
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Main Sentiment Display */}
          <div className="text-center">
            <div className={`text-4xl font-bold ${getSentimentColor(result.sentiment)} mb-4`}>
              {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
            </div>
            <div className="text-white text-xl">
              Confidence: <span className="font-bold">{result.confidence}%</span>
            </div>
          </div>

          {/* Sentiment Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Sentiment Breakdown</h3>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="flex h-8 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="bg-green-400 transition-all duration-700 ease-out flex items-center justify-center"
                  style={{ width: `${result.scores.positive}%` }}
                >
                  {result.scores.positive > 10 && (
                    <span className="text-white text-xs font-semibold">
                      {result.scores.positive}%
                    </span>
                  )}
                </div>
                <div 
                  className="bg-blue-400 transition-all duration-700 ease-out flex items-center justify-center"
                  style={{ width: `${result.scores.neutral}%` }}
                >
                  {result.scores.neutral > 10 && (
                    <span className="text-white text-xs font-semibold">
                      {result.scores.neutral}%
                    </span>
                  )}
                </div>
                <div 
                  className="bg-red-400 transition-all duration-700 ease-out flex items-center justify-center"
                  style={{ width: `${result.scores.negative}%` }}
                >
                  {result.scores.negative > 10 && (
                    <span className="text-white text-xs font-semibold">
                      {result.scores.negative}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Positive ({result.scores.positive}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400">Neutral ({result.scores.neutral}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-red-400">Negative ({result.scores.negative}%)</span>
              </div>
            </div>
          </div>

          {/* Key Phrases */}
          {result.keyPhrases && result.keyPhrases.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Key Phrases</h3>
              <div className="flex flex-wrap gap-2">
                {result.keyPhrases.map((phrase, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentBgColor(result.sentiment)}/20 ${getSentimentColor(result.sentiment)} border border-current/30`}
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-blue-200 text-lg mb-2">Ready to analyze</p>
          <p className="text-blue-300 text-sm">Enter a movie review to get started</p>
        </div>
      )}
    </div>
  );
};

export default SentimentResults;