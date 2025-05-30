
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { HappinessData, XPost, FilterState, SentimentGroupData } from '@/types';
import { FiltersBar } from '@/components/dashboard/filters-bar';
import { CorrelationChart } from '@/components/dashboard/correlation-chart';
import { XSentimentAnalyzer } from '@/components/dashboard/x-sentiment-analyzer';
import { SentimentPieChart } from '@/components/dashboard/sentiment-pie-chart';
import { socialDeterminantsMap, allDeterminantKeys, happinessScoreInfo } from '@/components/dashboard/icon-map';
import {
  mockHappinessData,
  getCountries,
  getYears,
  mockSentimentGroupData,
  getSentimentGroups
} from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


const initialFilterState: FilterState = {
  countries: [], // Empty array means 'all' countries initially for data fetching
  year: 'all',
  selectedDeterminants: allDeterminantKeys,
};

export default function DashboardClientContent() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [filteredHappinessData, setFilteredHappinessData] = useState<HappinessData[]>([]);
  const [currentSingleCountryHappinessData, setCurrentSingleCountryHappinessData] = useState<HappinessData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      const data = mockHappinessData.filter(item =>
        (filters.countries.length === 0 || filters.countries.includes(item.country)) &&
        (filters.year === 'all' || filters.year === 0 || item.year === filters.year)
      );
      setFilteredHappinessData(data);

      // Determine currentSingleCountryHappinessData for the "Sentiment Group vs. National Happiness" section
      if (filters.countries.length === 1 && filters.year !== 'all' && filters.year !== 0) {
        // User has selected a specific country AND a specific year
        const specificMatch = mockHappinessData.find(
          item => item.country === filters.countries[0] && item.year === (filters.year as number) // Ensure year is number
        );
        setCurrentSingleCountryHappinessData(specificMatch);
      } else {
        // Multiple countries selected, or 'all' countries, or 'all' years.
        setCurrentSingleCountryHappinessData(undefined);
      }

      setIsLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const countries = useMemo(() => getCountries(), []);
  const years = useMemo(() => getYears().map(y => y === 0 ? 'all' : y), []); // 0 from getYears() is treated as 'all'
  const sentimentGroups = useMemo(() => getSentimentGroups(), []);

  const HappinessScoreIcon = happinessScoreInfo.icon;

  const getNationalHappinessMessage = () => {
    if (filters.countries.length === 0 && (filters.year === 'all' || filters.year === 0)) {
      return "Select a single country and a specific year to display its happiness score.";
    }
    if (filters.countries.length === 0) {
      return "Select a single country to display its happiness score.";
    }
    if (filters.countries.length > 1) {
      return "Multiple countries selected. Please select a single country to see its specific happiness score.";
    }
    if (filters.year === 'all' || filters.year === 0) {
      return `Select a specific year for ${filters.countries[0]} to display its happiness score.`;
    }
    return `No happiness data available for ${filters.countries[0]} in ${filters.year}.`;
  };


  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <FiltersBar
        countries={countries}
        years={years}
        initialFilters={filters}
        onFilterChange={handleFilterChange}
      />

      <section aria-labelledby="correlation-charts-title">
        <h2 id="correlation-charts-title" className="text-2xl font-semibold mb-6 text-foreground/90">
          Happiness Correlations
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(filters.selectedDeterminants.length > 0 ? filters.selectedDeterminants : Array(2).fill(null)).map((key, index) => (
              <Skeleton key={key || `skeleton-${index}`} className="h-[400px] w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filters.selectedDeterminants.map(key => {
              const determinant = socialDeterminantsMap[key];
              if (!determinant) return null;
              return (
                <CorrelationChart
                  key={key}
                  data={filteredHappinessData}
                  determinant={determinant}
                />
              );
            })}
            {filters.selectedDeterminants.length === 0 && !isLoading && (
              <p className="md:col-span-2 text-center text-muted-foreground py-10">
                Select one or more social determinants in the filters to display charts.
              </p>
            )}
             {filteredHappinessData.length === 0 && !isLoading && filters.selectedDeterminants.length > 0 && (
              <p className="md:col-span-2 text-center text-muted-foreground py-10">
                No happiness data available for the selected criteria.
              </p>
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="group-sentiment-title">
        <h2 id="group-sentiment-title" className="text-2xl font-semibold mb-6 text-foreground/90">
          X/Twitter Sentiment Breakdown by Group
        </h2>
        <div className="max-w-xl mx-auto">
          <SentimentPieChart
            sentimentData={mockSentimentGroupData}
            availableGroups={sentimentGroups}
          />
        </div>
      </section>

      <section aria-labelledby="ai-tools-title">
        <h2 id="ai-tools-title" className="text-2xl font-semibold mb-6 text-foreground/90">
          AI-Powered X Sentiment Analysis Tools
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <XSentimentAnalyzer />
        </div>
      </section>

      <section aria-labelledby="sentiment-happiness-correlation-title">
        <h2 id="sentiment-happiness-correlation-title" className="text-2xl font-semibold mb-6 text-foreground/90">
          Sentiment Group vs. National Happiness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <SentimentPieChart
              sentimentData={mockSentimentGroupData}
              availableGroups={sentimentGroups}
            />
          </div>
          <div>
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <HappinessScoreIcon className="mr-2 h-6 w-6 text-primary" />
                  National Happiness Score
                </CardTitle>
                <CardDescription>
                  Happiness score for a single selected country and year (from main filters).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pt-6 text-center">
                {isLoading ? (
                  <Skeleton className="h-12 w-3/4 mb-2" />
                ) : currentSingleCountryHappinessData ? (
                  <>
                    <p className="text-4xl font-bold text-primary mb-1">{currentSingleCountryHappinessData.happinessScore.toFixed(3)}</p>
                    <p className="text-lg text-muted-foreground">
                      For {currentSingleCountryHappinessData.country} ({currentSingleCountryHappinessData.year})
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground px-4">
                    {getNationalHappinessMessage()}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
