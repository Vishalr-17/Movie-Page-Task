import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchSearchResults } from '../store/movieSlice';
import { RootState, AppDispatch } from '../store';
import MovieCard from '../components/MovieCard';

const SearchResultsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery().get('query') || '';

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  }, [dispatch, query]);

  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResultsPage;
