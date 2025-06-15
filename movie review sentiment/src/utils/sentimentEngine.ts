import type { SentimentResult } from '../types/sentiment';

// Mock sentiment analysis engine
// In a real application, this would call an actual ML API
export const analyzeSentiment = (text: string): SentimentResult => {
  // Normalize text for analysis
  const normalizedText = text.toLowerCase();
  
  // Define sentiment keywords
  const positiveKeywords = [
    'amazing', 'excellent', 'fantastic', 'brilliant', 'outstanding', 'superb',
    'wonderful', 'incredible', 'spectacular', 'perfect', 'love', 'loved',
    'great', 'good', 'awesome', 'best', 'beautiful', 'impressive',
    'entertaining', 'enjoyable', 'hilarious', 'heartwarming', 'thrilling'
  ];
  
  const negativeKeywords = [
    'terrible', 'awful', 'horrible', 'worst', 'bad', 'disappointing',
    'boring', 'waste', 'poor', 'pathetic', 'ridiculous', 'stupid',
    'hate', 'hated', 'annoying', 'confusing', 'meaningless', 'shallow',
    'predictable', 'cliché', 'overrated', 'underwhelming', 'forgettable'
  ];

  const neutralKeywords = [
    'okay', 'average', 'decent', 'fine', 'watchable', 'mediocre',
    'standard', 'typical', 'normal', 'ordinary', 'regular'
  ];

  // Count keyword occurrences
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  const foundKeyPhrases: string[] = [];

  // Analyze positive sentiment
  positiveKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = normalizedText.match(regex);
    if (matches) {
      positiveScore += matches.length;
      if (!foundKeyPhrases.includes(keyword)) {
        foundKeyPhrases.push(keyword);
      }
    }
  });

  // Analyze negative sentiment
  negativeKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = normalizedText.match(regex);
    if (matches) {
      negativeScore += matches.length;
      if (!foundKeyPhrases.includes(keyword)) {
        foundKeyPhrases.push(keyword);
      }
    }
  });

  // Analyze neutral sentiment
  neutralKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = normalizedText.match(regex);
    if (matches) {
      neutralScore += matches.length;
      if (!foundKeyPhrases.includes(keyword)) {
        foundKeyPhrases.push(keyword);
      }
    }
  });

  // Calculate total score
  const totalScore = positiveScore + negativeScore + neutralScore;
  
  // Handle cases with no sentiment keywords
  if (totalScore === 0) {
    // Use text length and exclamation marks as heuristics
    const exclamationCount = (text.match(/!/g) || []).length;
    const questionCount = (text.match(/\?/g) || []).length;
    const textLength = text.length;
    
    if (exclamationCount > 2 || textLength > 200) {
      return {
        sentiment: 'positive',
        confidence: 65,
        scores: { positive: 40, neutral: 50, negative: 10 },
        keyPhrases: ['enthusiastic tone']
      };
    } else if (questionCount > 2) {
      return {
        sentiment: 'neutral',
        confidence: 70,
        scores: { positive: 20, neutral: 60, negative: 20 },
        keyPhrases: ['questioning tone']
      };
    } else {
      return {
        sentiment: 'neutral',
        confidence: 75,
        scores: { positive: 25, neutral: 50, negative: 25 },
        keyPhrases: []
      };
    }
  }

  // Calculate percentages
  const positivePercentage = Math.round((positiveScore / totalScore) * 100);
  const negativePercentage = Math.round((negativeScore / totalScore) * 100);
  const neutralPercentage = 100 - positivePercentage - negativePercentage;

  // Determine overall sentiment
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;

  if (positiveScore > negativeScore && positiveScore > neutralScore) {
    sentiment = 'positive';
    confidence = Math.min(95, 60 + positivePercentage / 2);
  } else if (negativeScore > positiveScore && negativeScore > neutralScore) {
    sentiment = 'negative';
    confidence = Math.min(95, 60 + negativePercentage / 2);
  } else {
    sentiment = 'neutral';
    confidence = Math.min(90, 60 + Math.abs(50 - Math.max(positivePercentage, negativePercentage)));
  }

  // Adjust scores for better visualization
  const adjustedScores = {
    positive: Math.max(5, positivePercentage),
    neutral: Math.max(10, neutralPercentage),
    negative: Math.max(5, negativePercentage)
  };

  // Normalize to 100%
  const total = adjustedScores.positive + adjustedScores.neutral + adjustedScores.negative;
  const normalizedScores = {
    positive: Math.round((adjustedScores.positive / total) * 100),
    neutral: Math.round((adjustedScores.neutral / total) * 100),
    negative: Math.round((adjustedScores.negative / total) * 100)
  };

  // Ensure total is exactly 100%
  const scoreDiff = 100 - (normalizedScores.positive + normalizedScores.neutral + normalizedScores.negative);
  if (scoreDiff !== 0) {
    normalizedScores.neutral += scoreDiff;
  }

  return {
    sentiment,
    confidence: Math.round(confidence),
    scores: normalizedScores,
    keyPhrases: foundKeyPhrases.slice(0, 5) // Limit to 5 key phrases
  };
};