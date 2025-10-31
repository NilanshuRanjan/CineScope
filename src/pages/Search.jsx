import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

const Search = () => {
  const location = useLocation();
  const search = location.pathname.slice(10);
  const [moviesdata, setmoviedata] = useState([]);
  const [page, setPage] = useState(1);
  const { isAdultContent } = useContext(DataContext);
  const navigate = useNavigate();
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setPage(1);
  }, [location]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=${isAdultContent ? "true" : "false"}&language=en-US&page=${page}&api_key=${api_key}`;

    fetch(url)
      .then(res => res.json())
      .then(json => setmoviedata(json));
  }, [location, page, isAdultContent]);

  const handleClick = (movie) => {
    const type =
      movie.media_type === "movie"
        ? "movie"
        : movie.media_type === "tv"
        ? "tv"
        : movie.title
        ? "movie"
        : "tv";

    navigate(`/details/${type}/${movie.id}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <section className="explore-page pt-20 px-3 sm:px-6 md:px-10">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
        Search Results
      </h1>

      <div
        className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4 
        sm:gap-6 
        md:gap-8"
      >
        {moviesdata?.results?.length > 0 ? (
          moviesdata.results
            .filter(item => item.media_type !== "person")
            .filter(item => item.poster_path)
            .map(movie => (
              <div
                key={movie.id}
                className="movie-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
                onClick={() => handleClick(movie)}
              >
                <img
                  className="w-full 
                    h-[200px] 
                    sm:h-[260px] 
                    md:h-[300px] 
                    object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />

                <div className="p-3 sm:p-4 text-white">
                  <h3 className="font-bold text-sm sm:text-lg truncate">
                    {movie.title || movie.name}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    {movie.release_date || movie.first_air_date
                      ? `Release: ${movie.release_date || movie.first_air_date}`
                      : "No Release Date"}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p className="text-white text-center col-span-full">Loading movies...</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="
            bg-gray-700 text-white 
            px-3 sm:px-4 py-2 
            rounded disabled:opacity-50"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-white px-3 sm:px-4 py-2 text-sm sm:text-base">
          Page {page}
        </span>

        <button
          className="
            bg-gray-700 text-white 
            px-3 sm:px-4 py-2 
            rounded"
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Search;
