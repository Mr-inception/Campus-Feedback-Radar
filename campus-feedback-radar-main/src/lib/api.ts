const API_BASE_URL = 'cf-backend-production.up.railway.app/api';

export interface Feedback {
  name: string;
  email: string;
  eventName: string;
  eventType: string;
  rating: number;
  comments: string;
}

export interface FeedbackStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
}

export const submitFeedback = async (feedback: Feedback) => {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedback),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit feedback');
  }

  return response.json();
};

export const getFeedback = async (timeRange: string) => {
  const response = await fetch(`${API_BASE_URL}/feedback?timeRange=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }

  return response.json();
};

export const getFeedbackStats = async (timeRange: string) => {
  const response = await fetch(`${API_BASE_URL}/feedback/stats?timeRange=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback stats');
  }

  return response.json();
}; 