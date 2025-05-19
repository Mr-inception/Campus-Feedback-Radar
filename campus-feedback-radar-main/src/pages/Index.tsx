import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-campus-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Feedback Radar</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Help improve campus activities by sharing your valuable feedback on events and club activities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-campus-700 hover:bg-gray-100">
                <Link to="/submit">Submit Feedback</Link>
              </Button>
              <Button asChild size="lg" className="bg-campus-600 text-white hover:bg-campus-700">
                <Link to="/dashboard">View Details</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-campus-700">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-campus-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-campus-700">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Feedback</h3>
                <p className="text-gray-600">Share your thoughts about campus events and club activities through our easy-to-use form</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-campus-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-campus-700">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5Z"/>
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
                <p className="text-gray-600">Our system automatically analyzes feedback sentiment to understand common trends</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-campus-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-campus-700">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Insightful Dashboard</h3>
                <p className="text-gray-600">Administrators can view aggregated feedback data to make informed decisions</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-campus-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-campus-700">Ready to Contribute?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
              Your feedback helps improve campus events and activities for everyone. Share your thoughts today!
            </p>
            <Button asChild size="lg" className="bg-campus-600 hover:bg-campus-700">
              <Link to="/submit">Submit Your Feedback</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
