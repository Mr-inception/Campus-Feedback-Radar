import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getTrendStats } from "@/lib/api";

interface TrendStat {
    date: string;
    count: number;
    avgRating: number;
}

interface TrendChartProps {
    timeRange: string;
}

const TrendChart = ({ timeRange }: TrendChartProps) => {
    const [data, setData] = useState<TrendStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const stats = await getTrendStats(timeRange);
                setData(stats);
            } catch (error) {
                console.error("Failed to fetch trend stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    if (isLoading) {
        return (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Feedback Trends Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-500">Loading...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Feedback Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => {
                                    if (timeRange === 'thisYear') return date; // Mon-YYYY
                                    return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                                }}
                            />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="count"
                                name="Submissions"
                                stroke="#3b56dc"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#3b56dc" }}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="avgRating"
                                name="Avg Rating"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#f59e0b" }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default TrendChart;
