
import type { LucideIcon } from 'lucide-react';
import { DollarSign, HeartPulse, GraduationCap, Users, ShieldCheck, Gift, SearchSlash, BarChartBig, Activity, Globe } from 'lucide-react';

export interface DeterminantInfo {
  label: string;
  icon: LucideIcon;
  dataKey: string; // Corresponds to key in HappinessData
  description: string;
}

export const socialDeterminantsMap: Record<string, DeterminantInfo> = {
  gdp: { 
    label: 'GDP per Capita', 
    icon: DollarSign, 
    dataKey: 'gdp',
    description: 'Gross Domestic Product per capita, a measure of economic output.'
  },
  healthLifeExpectancy: { 
    label: 'Health & Life Expectancy', 
    icon: HeartPulse, 
    dataKey: 'healthLifeExpectancy',
    description: 'Average number of years a person can expect to live in good health.'
  },
  education: { 
    label: 'Education Level', 
    icon: GraduationCap, 
    dataKey: 'education',
    description: 'Education Index (score 0-1, higher is better). Placeholder value (12) used for countries with missing index data, which is on a different scale.'
  },
  socialSupport: { 
    label: 'Social Support', 
    icon: Users, 
    dataKey: 'socialSupport',
    description: 'Having friends or relatives to count on in times of trouble.'
  },
  freedomToMakeLifeChoices: {
    label: 'Freedom of Choice',
    icon: Globe, 
    dataKey: 'freedomToMakeLifeChoices',
    description: 'Freedom to make life choices.'
  },
  generosity: {
    label: 'Generosity',
    icon: Gift,
    dataKey: 'generosity',
    description: 'Generosity of people in the country.'
  },
  perceptionsOfCorruption: {
    label: 'Corruption Perception',
    icon: SearchSlash, 
    dataKey: 'perceptionsOfCorruption',
    description: 'Perceptions of corruption in government and business.'
  },
  // xHappinessIndex removed from here
};

export const allDeterminantKeys = Object.keys(socialDeterminantsMap);

// Helper for chart axes if needed
export const happinessScoreInfo = {
  label: 'Happiness Score',
  icon: BarChartBig, 
  dataKey: 'happinessScore',
  description: 'Overall happiness score based on survey data.'
};

    

    