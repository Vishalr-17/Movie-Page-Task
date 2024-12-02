import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500"
          }
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-500">Movie ID: {movie.id}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
