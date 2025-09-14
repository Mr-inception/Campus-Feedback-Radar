// Base URL for all API calls.
// Uses Vite env var when available so prod can point to real backend.
// Automatically detect if we're on localhost or network IP
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // If we're on localhost, use localhost for backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return "http://localhost:5000";
  }
  
  // For production (Vercel), use relative URLs
  if (window.location.hostname.includes('vercel.app')) {
    return ""; // Use relative URLs for same-domain API calls
  }
  
  // If we're on network IP, use the same network IP for backend
  return `http://${window.location.hostname}:5000`;
};

export const API_BASE_URL = getApiBaseUrl();

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
  console.log('Submitting feedback to:', `${API_BASE_URL}/api/feedback`);
  console.log('Feedback data:', feedback);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      throw new Error(error.error || 'Failed to submit feedback');
    }

    const result = await response.json();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getFeedback = async (timeRange: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedback?timeRange=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }

  return response.json();
};

export const getFeedbackStats = async (timeRange: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedback/stats?timeRange=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback stats');
  }

  return response.json();
}; 