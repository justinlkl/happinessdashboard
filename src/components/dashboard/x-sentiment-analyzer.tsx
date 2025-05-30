'use client';

import { useState } from 'react';
import { analyzeXSentiment, type AnalyzeXSentimentOutput } from '@/ai/flows/analyze-x-sentiment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquareText, TrendingUp, TrendingDown, MinusCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export function XSentimentAnalyzer() {
  const [postText, setPostText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeXSentimentOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!postText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeXSentiment({ post: postText });
      setAnalysisResult(result);
    } catch (e) {
      console.error("Error analyzing sentiment:", e);
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentIcon = (label: string | undefined) => {
    if (!label) return <Info className="h-4 w-4" />;
    switch (label.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-accent" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case 'neutral':
        return <MinusCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const getSentimentBadgeVariant = (label: string | undefined): "default" | "destructive" | "secondary" | "outline" => {
    if (!label) return "outline";
    switch (label.toLowerCase()) {
      case 'positive':
        return "default"; // Will use accent color due to theme potentially
      case 'negative':
        return "destructive";
      case 'neutral':
        return "secondary";
      default:
        return "outline";
    }
  }


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MessageSquareText className="mr-2 h-6 w-6 text-primary" />
          X Post Sentiment Analyzer
        </CardTitle>
        <CardDescription>
          Analyze the sentiment of an X (formerly Twitter) post using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter X post text here..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          rows={4}
          className="resize-none"
          aria-label="X Post Input"
        />
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {analysisResult && (
          <Card className="bg-background/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                Analysis Result
                <Badge variant={getSentimentBadgeVariant(analysisResult.sentimentLabel)} className="ml-2 capitalize">
                  {getSentimentIcon(analysisResult.sentimentLabel)}
                  <span className="ml-1">{analysisResult.sentimentLabel}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Score:</strong> {analysisResult.sentimentScore.toFixed(2)}</p>
              <p><strong>Summary:</strong> {analysisResult.summary}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Sentiment'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
