
export interface HappinessData {
  id: string; // Unique identifier for each data point
  country: string;
  region: string; // Retained for potential future use, but filtering will be by country
  year: number;
  happinessScore: number;
  gdp: number; // GDP per capita
  healthLifeExpectancy: number;
  education: number; // Years of schooling
  socialSupport: number;
  freedomToMakeLifeChoices: number;
  generosity: number;
  perceptionsOfCorruption: number;
  xHappinessIndex?: number; // Optional: derived from X/Twitter sentiment
}

export interface XPost {
  id: string;
  text: string;
  author?: string;
  timestamp?: string;
  country?: string; 
  year?: number;   
}

export interface FilterState {
  countries: string[]; // Changed from country: string | 'all'
  year: number | 'all';
  selectedDeterminants: string[];
}

export interface SentimentGroupData {
  group: string;
  positive: number;
  negative: number;
  neutral: number;
  irrelevant: number;
}
