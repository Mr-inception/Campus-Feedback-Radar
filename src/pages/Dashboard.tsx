import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SentimentCard from "@/components/SentimentCard";
import FeedbackChart from "@/components/FeedbackChart";
import RecentFeedbackTable from "@/components/RecentFeedbackTable";
import EventTypeChart from "@/components/EventTypeChart";
import TrendChart from "@/components/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFeedbackStats } from "@/lib/api";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("last30days");
  const [stats, setStats] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
    positivePercentage: 0,
    neutralPercentage: 0,
    negativePercentage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getFeedbackStats(timeRange);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-campus-700 mb-2">Feedback Analytics Dashboard</h1>
              <p className="text-gray-600">Analyze student feedback and identify areas for improvement</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last90days">Last 90 days</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <SentimentCard
              title="Positive Feedback"
              value={stats.positivePercentage}
              description={`${stats.positive} positive responses`}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up">
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              }
              colorClass="bg-feedback-positive/20 text-feedback-positive"
            />
            <SentimentCard
              title="Neutral Feedback"
              value={stats.neutralPercentage}
              description={`${stats.neutral} neutral responses`}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
                  <path d="M5 12h14" />
                </svg>
              }
              colorClass="bg-feedback-neutral/20 text-feedback-neutral"
            />
            <SentimentCard
              title="Negative Feedback"
              value={stats.negativePercentage}
              description={`${stats.negative} negative responses`}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-down">
                  <path d="M17 14V2" />
                  <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                </svg>
              }
              colorClass="bg-feedback-negative/20 text-feedback-negative"
            />
            <SentimentCard
              title="Total Submissions"
              value={stats.total}
              description="Total feedback submissions"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
              }
              colorClass="bg-blue-100 text-blue-600"
            />
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">By Event Type</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-8 mt-6">
              <FeedbackChart timeRange={timeRange} />
              <RecentFeedbackTable timeRange={timeRange} />
            </TabsContent>
            <TabsContent value="events">
              <EventTypeChart />
            </TabsContent>
            <TabsContent value="trends">
              <TrendChart timeRange={timeRange} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
