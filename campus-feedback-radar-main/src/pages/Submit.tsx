
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackForm from "@/components/FeedbackForm";

const Submit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-campus-700">Submit Your Feedback</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Your honest feedback helps us improve campus events and activities. Please take a moment to share your thoughts.
          </p>
          <FeedbackForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Submit;
