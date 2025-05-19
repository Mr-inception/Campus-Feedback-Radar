
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-campus-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white text-campus-700 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Campus Feedback Radar</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-campus-200">Home</Link>
          <Link to="/submit" className="hover:text-campus-200">Submit Feedback</Link>
          <Link to="/dashboard" className="hover:text-campus-200">Dashboard</Link>
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-white hover:bg-campus-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
