
'use client';

import { useState, useMemo } from 'react';
import type { SentimentGroupData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart as ChartIcon } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell as RechartsCell } from "recharts";

interface SentimentPieChartProps {
  sentimentData: SentimentGroupData[];
  availableGroups: string[];
}

// Define colors for each sentiment category
// These will be used by ChartLegend and ChartTooltip via chartConfig
const sentimentColors: Record<string, string> = {
  Positive: 'hsl(var(--chart-2))', // Accent Green
  Negative: 'hsl(var(--chart-5))', // Reddish
  Neutral: 'hsl(var(--chart-1))',  // Primary Blue
  Irrelevant: 'hsl(var(--chart-4))', // Purple-ish
};


export function SentimentPieChart({ sentimentData, availableGroups }: SentimentPieChartProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>(availableGroups[0] || '');

  const pieChartData = useMemo(() => {
    if (!selectedGroup) return [];
    const groupData = sentimentData.find(d => d.group === selectedGroup);
    if (!groupData) return [];

    return [
      { name: 'Positive', value: groupData.positive, fill: sentimentColors.Positive },
      { name: 'Negative', value: groupData.negative, fill: sentimentColors.Negative },
      { name: 'Neutral', value: groupData.neutral, fill: sentimentColors.Neutral },
      { name: 'Irrelevant', value: groupData.irrelevant, fill: sentimentColors.Irrelevant },
    ].filter(item => item.value > 0); // Only include segments with a value > 0
  }, [selectedGroup, sentimentData]);

  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    pieChartData.forEach(item => {
      config[item.name] = { // Use the 'name' field (e.g., "Positive") as the key
        label: item.name,
        color: item.fill,
      };
    });
    return config;
  }, [pieChartData]);


  if (availableGroups.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <ChartIcon className="mr-2 h-6 w-6 text-primary" />
            Sentiment Distribution
          </CardTitle>
          <CardDescription>No sentiment group data available to display.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <p className="text-muted-foreground">No data provided.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <ChartIcon className="mr-2 h-6 w-6 text-primary" />
          Sentiment Distribution by Group
        </CardTitle>
        <CardDescription>
          Select a group to see its X/Twitter post sentiment breakdown. Percentages are of total posts for that group.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto sm:mx-0">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger id="sentiment-group-select" aria-label="Select sentiment group">
              <SelectValue placeholder="Select Group" />
            </SelectTrigger>
            <SelectContent>
              {availableGroups.map(group => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedGroup && pieChartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[400px]">
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel indicator="dot" nameKey="name" formatter={(value, name, props) => {
                    const percentage = (props.payload.value * 100).toFixed(1);
                    return (
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{props.payload.name}</span>
                        <span className="text-muted-foreground">{percentage}%</span>
                      </div>
                    );
                }}/>}
              />
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name" // Links to chartConfig via item.name
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={50} // Donut chart
                labelLine={false}
                paddingAngle={1}
              >
                {pieChartData.map((entry, index) => (
                  <RechartsCell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" className="text-sm" />}
                className="-translate-y-1 mt-4 flex-wrap justify-center gap-x-4 gap-y-1 [&>*]:basis-auto"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[350px] text-muted-foreground">
            <p>{selectedGroup ? 'No sentiment data to display for this group.' : 'Please select a group to view the chart.'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
