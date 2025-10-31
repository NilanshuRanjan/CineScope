import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie}) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigate = useNavigate();

  const type =
    movie.media_type ||
    (movie.title ? "movie" : "series");

  const handleclick = () => {
    navigate(`/details/${type}/${movie.id}`);
  };

  return (
    <div
      className="
        bg-gray-800 rounded-lg shadow-md overflow-hidden 
        w-[160px] h-[280px] 
        sm:w-[180px] sm:h-[320px]
        md:w-[200px] md:h-[360px]
        lg:w-[230px] lg:h-[400px]
        cursor-pointer
      "
      onClick={handleclick}
    >
      <img 
        src={posterUrl} 
        alt={movie.title || movie.original_title || movie.original_name}
        className="w-full h-[70%] object-cover"
      />

      <div className="p-3 h-[30%]">
        <h3 className="text-white text-sm sm:text-base font-bold truncate">
          {movie.title || movie.original_title || movie.original_name}
        </h3>

        <p className="text-gray-400 text-xs sm:text-sm truncate">
          {movie.release_date}
        </p>

        <div className="flex items-center text-sm">
          <span className="text-yellow-500">{movie.vote_average.toFixed(1)}</span>
          <span className="ml-1 text-gray-400">/ 10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
