import React, { useState } from 'react';
import { Film, Sparkles, Zap } from 'lucide-react';
import SentimentInput from './SentimentInput';
import SentimentResults from './SentimentResults';
import { analyzeSentiment } from '../utils/sentimentEngine';
import type { SentimentResult } from '../types/sentiment';

const SentimentAnalyzer: React.FC = () => {
  const [reviewText, setReviewText] = useState('');
  const [sentimentResult, setSentimentResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!reviewText.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const result = analyzeSentiment(reviewText);
    setSentimentResult(result);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setReviewText('');
    setSentimentResult(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm mr-4">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Movie Review Sentiment Analyzer
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover the emotional tone of movie reviews with our advanced AI-powered sentiment analysis
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-white text-sm">Real-time Analysis</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-white text-sm">Confidence Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <SentimentInput
                reviewText={reviewText}
                onReviewTextChange={setReviewText}
                onAnalyze={handleAnalyze}
                onClear={handleClear}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <SentimentResults
                result={sentimentResult}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <p className="text-blue-200">
              Advanced sentiment analysis powered by machine learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SentimentAnalyzer;