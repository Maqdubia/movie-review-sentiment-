export interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  scores: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keyPhrases?: string[];
}

export interface SentimentAnalysisRequest {
  text: string;
}