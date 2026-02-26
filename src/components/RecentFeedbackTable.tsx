import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedback } from "@/lib/api";

interface Feedback {
  _id: string;
  name: string;
  email: string;
  eventName: string;
  eventType: string;
  rating: number;
  comments: string;
  createdAt: string;
}

interface RecentFeedbackTableProps {
  timeRange: string;
}

const RecentFeedbackTable = ({ timeRange }: RecentFeedbackTableProps) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const data = await getFeedback(timeRange);
        setFeedback(data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [timeRange]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Event</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Comments</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.eventName}</td>
                  <td className="py-3 px-4 capitalize">{item.eventType}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={i < item.rating ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`lucide lucide-star ${i < item.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">{item.comments}</td>
                  <td className="py-3 px-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentFeedbackTable;
