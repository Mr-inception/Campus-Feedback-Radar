import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getEventTypeStats } from "@/lib/api";

const COLORS = ["#3b56dc", "#4a71e8", "#7097f2", "#9cbbf7", "#c2d5fb", "#dde7fc"];

interface EventStat {
    name: string;
    count: number;
    avgRating: number;
}

const EventTypeChart = () => {
    const [data, setData] = useState<EventStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await getEventTypeStats();
                setData(stats);
            } catch (error) {
                console.error("Failed to fetch event type stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Event Type Analysis</CardTitle>
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
                <CardTitle>Submissions by Event Type</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(value: number, name: string) => [value, name === 'count' ? 'Submissions' : 'Avg Rating']}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventTypeChart;
