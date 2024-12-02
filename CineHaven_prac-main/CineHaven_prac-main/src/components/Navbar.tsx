import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand and Menu Toggle */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold">
            CineHaven
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center space-x-6`}
        >
          <Link to="/" className="hover:text-gray-400">
            Popular
          </Link>
          <Link to="/top-rated" className="hover:text-gray-400">
            Top Rated
          </Link>
          <Link to="/upcoming" className="hover:text-gray-400">
            Upcoming
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Movie Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-md border-2 border-gray-500 bg-transparent"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Movie Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full rounded-md border-2 border-gray-500 bg-transparent"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            Search
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
