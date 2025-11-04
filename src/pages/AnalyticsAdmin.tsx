import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, RefreshCw, Users, ClipboardCheck, TrendingUp, Percent } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface QuizStats {
  totalCompletions: number;
  averageScore: number;
  tierDistribution: { tier: number; count: number; name: string }[];
  recentCompletions: number;
  totalRetakes: number;
  scoreDistribution: { range: string; count: number }[];
  completionsOverTime: { date: string; count: number }[];
  recentSubmissions: Array<{
    email: string;
    score: number;
    tier: number;
    completed_at: string;
  }>;
}

interface WaitlistStats {
  totalSignups: number;
  recentSignups7Days: number;
  recentSignups30Days: number;
  recentEntries: Array<{
    email: string;
    created_at: string;
    referral_source: string | null;
  }>;
}

interface ConversionStats {
  quizCount: number;
  waitlistCount: number;
  conversionRate: number;
}

const TIER_COLORS = {
  1: '#ef4444', // red
  2: '#f59e0b', // amber
  3: '#10b981', // green
};

const TIER_NAMES = {
  1: 'Caring Procrastinator',
  2: 'Thoughtful Planner',
  3: 'Conversation-Ready Champion',
};

const AnalyticsAdmin = () => {
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [waitlistStats, setWaitlistStats] = useState<WaitlistStats | null>(null);
  const [conversionStats, setConversionStats] = useState<ConversionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch quiz statistics
      const { data: quizData, error: quizError } = await supabase
        .from('quiz_submissions')
        .select('*')
        .order('completed_at', { ascending: false });

      if (quizError) throw quizError;

      // Calculate quiz stats
      const totalCompletions = quizData?.length || 0;
      const averageScore = quizData?.length 
        ? quizData.reduce((sum, item) => sum + item.score, 0) / quizData.length 
        : 0;

      // Tier distribution
      const tierCounts = { 1: 0, 2: 0, 3: 0 };
      quizData?.forEach(item => {
        tierCounts[item.tier as 1 | 2 | 3]++;
      });
      const tierDistribution = Object.entries(tierCounts).map(([tier, count]) => ({
        tier: parseInt(tier),
        count,
        name: TIER_NAMES[parseInt(tier) as 1 | 2 | 3],
      }));

      // Recent completions (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentCompletions = quizData?.filter(
        item => new Date(item.completed_at) >= thirtyDaysAgo
      ).length || 0;

      // Total retakes
      const totalRetakes = quizData?.reduce((sum, item) => sum + (item.retake_count || 1) - 1, 0) || 0;

      // Score distribution
      const scoreRanges = { '0-8': 0, '9-16': 0, '17-24': 0 };
      quizData?.forEach(item => {
        if (item.score <= 8) scoreRanges['0-8']++;
        else if (item.score <= 16) scoreRanges['9-16']++;
        else scoreRanges['17-24']++;
      });
      const scoreDistribution = Object.entries(scoreRanges).map(([range, count]) => ({
        range,
        count,
      }));

      // Completions over time (last 30 days)
      const completionsByDate: { [key: string]: number } = {};
      quizData?.forEach(item => {
        const date = format(new Date(item.completed_at), 'MMM dd');
        completionsByDate[date] = (completionsByDate[date] || 0) + 1;
      });
      const completionsOverTime = Object.entries(completionsByDate)
        .map(([date, count]) => ({ date, count }))
        .slice(-30);

      // Recent submissions (last 10)
      const recentSubmissions = quizData?.slice(0, 10).map(item => ({
        email: item.email,
        score: item.score,
        tier: item.tier,
        completed_at: item.completed_at,
      })) || [];

      setQuizStats({
        totalCompletions,
        averageScore,
        tierDistribution,
        recentCompletions,
        totalRetakes,
        scoreDistribution,
        completionsOverTime,
        recentSubmissions,
      });

      // Fetch waitlist statistics
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (waitlistError) throw waitlistError;

      const totalSignups = waitlistData?.length || 0;
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSignups7Days = waitlistData?.filter(
        item => new Date(item.created_at) >= sevenDaysAgo
      ).length || 0;

      const recentSignups30Days = waitlistData?.filter(
        item => new Date(item.created_at) >= thirtyDaysAgo
      ).length || 0;

      const recentEntries = waitlistData?.slice(0, 10).map(item => ({
        email: item.email,
        created_at: item.created_at,
        referral_source: item.referral_source,
      })) || [];

      setWaitlistStats({
        totalSignups,
        recentSignups7Days,
        recentSignups30Days,
        recentEntries,
      });

      // Calculate conversion stats
      const quizEmails = new Set(quizData?.map(item => item.email.toLowerCase()) || []);
      const waitlistEmails = new Set(waitlistData?.map(item => item.email.toLowerCase()) || []);
      
      const quizCount = quizEmails.size;
      const waitlistCount = waitlistEmails.size;
      
      let convertedCount = 0;
      quizEmails.forEach(email => {
        if (waitlistEmails.has(email)) convertedCount++;
      });

      const conversionRate = quizCount > 0 ? (convertedCount / quizCount) * 100 : 0;

      setConversionStats({
        quizCount,
        waitlistCount,
        conversionRate,
      });

      toast({
        title: 'Analytics refreshed',
        description: 'All data has been updated successfully.',
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error loading analytics',
        description: 'There was a problem loading the analytics data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/admin/waitlist">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Waitlist
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-foreground">Analytics Dashboard</h1>
          </div>
          <Button onClick={fetchAnalytics} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quiz Completions</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizStats?.totalCompletions || 0}</div>
              <p className="text-xs text-muted-foreground">
                {quizStats?.recentCompletions || 0} in last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quizStats?.averageScore.toFixed(1) || 0} / 24
              </div>
              <p className="text-xs text-muted-foreground">
                {quizStats?.totalRetakes || 0} total retakes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waitlist Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waitlistStats?.totalSignups || 0}</div>
              <p className="text-xs text-muted-foreground">
                {waitlistStats?.recentSignups7Days || 0} in last 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversionStats?.conversionRate.toFixed(1) || 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Quiz → Waitlist
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tier Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tier Distribution</CardTitle>
              <CardDescription>How users are categorized</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={quizStats?.tierDistribution || []}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.name}: ${entry.count}`}
                  >
                    {quizStats?.tierDistribution.map((entry) => (
                      <Cell key={entry.tier} fill={TIER_COLORS[entry.tier as 1 | 2 | 3]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Score Distribution Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>Quiz score ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizStats?.scoreDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Completions Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Completions Over Time</CardTitle>
            <CardDescription>Last 30 days trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={quizStats?.completionsOverTime || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Completions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Quiz Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Submissions</CardTitle>
              <CardDescription>Last 10 completions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizStats?.recentSubmissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">{submission.email}</TableCell>
                      <TableCell>{submission.score}/24</TableCell>
                      <TableCell>
                        <span 
                          className="px-2 py-1 rounded text-xs font-semibold text-white"
                          style={{ backgroundColor: TIER_COLORS[submission.tier as 1 | 2 | 3] }}
                        >
                          T{submission.tier}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        {format(new Date(submission.completed_at), 'MMM dd, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Waitlist Signups */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Waitlist Signups</CardTitle>
              <CardDescription>Last 10 signups</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlistStats?.recentEntries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">{entry.email}</TableCell>
                      <TableCell className="text-xs">
                        {entry.referral_source || 'Direct'}
                      </TableCell>
                      <TableCell className="text-xs">
                        {format(new Date(entry.created_at), 'MMM dd, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Security Note */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-amber-600">⚠️ Security Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This admin dashboard is currently accessible to anyone who knows the URL. 
              Consider implementing authentication before deploying to production.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsAdmin;
