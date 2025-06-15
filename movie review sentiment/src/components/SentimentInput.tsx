import React from 'react';
import { ArrowRight, Trash2, Loader2 } from 'lucide-react';

interface SentimentInputProps {
  reviewText: string;
  onReviewTextChange: (text: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isAnalyzing: boolean;
}

const SentimentInput: React.FC<SentimentInputProps> = ({
  reviewText,
  onReviewTextChange,
  onAnalyze,
  onClear,
  isAnalyzing
}) => {
  const characterCount = reviewText.length;
  const maxCharacters = 1000;
  const isOverLimit = characterCount > maxCharacters;
  const canAnalyze = reviewText.trim().length > 0 && !isOverLimit && !isAnalyzing;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Review Analysis</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={reviewText}
            onChange={(e) => onReviewTextChange(e.target.value)}
            placeholder="Enter your movie review here..."
            className={`w-full h-64 p-4 bg-white/5 border-2 rounded-xl text-white placeholder-blue-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
              isOverLimit ? 'border-red-400 focus:ring-red-400' : 'border-white/20'
            }`}
            disabled={isAnalyzing}
          />
          
          {/* Character Counter */}
          <div className={`absolute bottom-3 right-3 text-sm px-2 py-1 rounded ${
            isOverLimit 
              ? 'text-red-400 bg-red-400/20' 
              : characterCount > maxCharacters * 0.8 
                ? 'text-yellow-400 bg-yellow-400/20' 
                : 'text-blue-200 bg-white/10'
          }`}>
            {characterCount}/{maxCharacters}
          </div>
        </div>

        {isOverLimit && (
          <p className="text-red-400 text-sm flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
            Character limit exceeded. Please shorten your review.
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClear}
            disabled={isAnalyzing || reviewText.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/40 text-white rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          
          <button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              canAnalyze
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Sentiment
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentimentInput;