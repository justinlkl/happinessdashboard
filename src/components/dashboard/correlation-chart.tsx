'use client';

import type { HappinessData } from '@/types';
import type { DeterminantInfo } from './icon-map';
import { happinessScoreInfo } from './icon-map';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface CorrelationChartProps {
  data: HappinessData[];
  determinant: DeterminantInfo;
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const determinant = payload[0].name === happinessScoreInfo.dataKey ? payload[1] : payload[0];
    const happiness = payload[0].name === happinessScoreInfo.dataKey ? payload[0] : payload[1];


    return (
      <div className="bg-popover text-popover-foreground p-3 rounded-md shadow-lg border border-border">
        <p className="font-bold text-lg">{dataPoint.country}</p>
        <p className="text-sm">{`${determinant.name}: ${dataPoint[determinant.dataKey]}`}</p>
        <p className="text-sm">{`${happinessScoreInfo.label}: ${dataPoint.happinessScore}`}</p>
        <p className="text-xs text-muted-foreground mt-1">Year: {dataPoint.year}</p>
      </div>
    );
  }
  return null;
};

export function CorrelationChart({ data, determinant, isLoading }: CorrelationChartProps) {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <Card className="shadow-lg h-[400px] flex items-center justify-center">
        <CardContent>
          <p>Loading chart data...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!data || data.length === 0) {
     return (
      <Card className="shadow-lg h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <determinant.icon className="mr-2 h-6 w-6 text-primary" />
            {determinant.label} vs. Happiness
          </CardTitle>
          <CardDescription>{determinant.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full text-muted-foreground">
          <p>No data available for the selected filters.</p>
        </CardContent>
      </Card>
    );
  }


  const chartData = data.map(item => ({
    ...item,
    [determinant.dataKey]: item[determinant.dataKey as keyof HappinessData] as number, // Ensure it's a number
  }));
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <determinant.icon className="mr-2 h-6 w-6 text-primary" />
          {determinant.label} vs. {happinessScoreInfo.label}
        </CardTitle>
        <CardDescription>Correlation between {determinant.label.toLowerCase()} and overall happiness. Each point represents a country.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart
            margin={{
              top: 20,
              right: isMobile ? 10 : 20,
              bottom: 20,
              left: isMobile ? -10 : 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey={determinant.dataKey} 
              name={determinant.label} 
              stroke="hsl(var(--foreground))"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis 
              type="number" 
              dataKey={happinessScoreInfo.dataKey} 
              name={happinessScoreInfo.label} 
              stroke="hsl(var(--foreground))"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              domain={[0, 10]} // Happiness score typically 0-10
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px', paddingTop: '10px' }} />
            <Scatter 
                name={determinant.label} 
                data={chartData} 
                fill="hsl(var(--primary))" 
                shape="circle" 
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
