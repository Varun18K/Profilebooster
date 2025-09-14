import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LP</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">LinkedIn Profile Enhancer</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/input" className="text-gray-600 hover:text-blue-600 transition-colors">
              Enhance Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;