
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} Campus Feedback Radar</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-campus-600">Terms</a>
            <a href="#" className="text-gray-600 hover:text-campus-600">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-campus-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
