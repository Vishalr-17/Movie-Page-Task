import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMovieDetail, fetchMovieCast } from "../store/movieSlice";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const movie = useSelector((state: RootState) => state.movies.selectedMovie);
  const cast = useSelector((state: RootState) => state.movies.cast);
  const loading = useSelector((state: RootState) => state.movies.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id));
      dispatch(fetchMovieCast(id));
    }
  }, [id, dispatch]);

  if (loading)
    return <div className="text-center text-black mt-10">Loading...</div>;
  if (!movie)
    return <div className="text-center text-black mt-10">No movie data available</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Backdrop Section */}
      <div
        className="relative h-96"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
          <div className="text-lg">
            <span className="font-bold text-xl text-blue-500">
              Rating: {movie.vote_average?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <span className="px-3 py-1 bg-gray-700 rounded text-sm">
              {movie.runtime} min
            </span>
            <span>{movie.genres?.map((genre) => genre.name).join(", ")}</span>
          </div>
          <p className="text-sm mt-2">
            <span className="font-bold">Release Date: </span>
            {movie.release_date}
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-6 bg-gray-800 p-6 rounded-lg">
          <img
            className="rounded-lg shadow-md w-full md:w-1/3"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-lg leading-relaxed mb-4">{movie.overview}</p>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="bg-gray-800 p-4 rounded-lg text-center shadow-md"
              >
                <img
                  className="w-full h-40 object-cover rounded-lg mb-2"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : `https://via.placeholder.com/500`
                  }
                  alt={actor.name}
                />
                <p className="text-sm font-bold">{actor.name}</p>
                <p className="text-xs text-gray-400">as {actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
