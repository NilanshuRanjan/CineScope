import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ExplorePage = () => {
  const { isAdultContent, toggleAdultContent } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [moviesdata_ex, setMoviesDataEx] = useState({});
  const [seriesdata_ex, setSeriesDataEx] = useState({});
  const [page, setPage] = useState(1);

  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [location]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=${isAdultContent ? "true" : "false"}&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${api_key}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setMoviesDataEx(json);
      })
      .catch(err => console.error("Error fetching movies:", err));
  }, [page, isAdultContent]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/tv?include_adult=${isAdultContent ? "true" : "false"}&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${api_key}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setSeriesDataEx(json);
      })
      .catch(err => console.error("Error fetching series:", err));
  }, [page]);

  useEffect(() => {
    if (location.pathname === "/movie" && moviesdata_ex.results) {
      setData(moviesdata_ex);
    } else if (location.pathname !== "/movie" && seriesdata_ex.results) {
      setData(seriesdata_ex);
    }
  }, [moviesdata_ex, seriesdata_ex, location]);

  const handleClick = (movie) => {
    const type =
      movie.media_type ||
      (movie.title ? "movie" : "series");

    navigate(`/details/${type}/${movie.id}`);
  };

  return (
    <section className="explore-page pt-20 px-3 sm:px-6 md:px-10">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
        {location.pathname === "/movie" ? "Explore Movies" : "Explore TV Shows"}
      </h1>

      <div className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-4 sm:gap-6 md:gap-8"
      >
        {data?.results?.length > 0 ? (
          data.results.map((item) => (
            <div
              key={item.id}
              className="movie-card relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-all"
              onClick={() => handleClick(item)}
            >
              <img
                className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title || item.name}
              />
              <div className="p-3 sm:p-4 text-white">
                <h3 className="font-bold text-sm sm:text-lg truncate">
                  {item.title || item.name}
                </h3>
                <p className="text-xs sm:text-sm opacity-80">
                  {item.release_date
                    ? `Release: ${item.release_date}`
                    : "No Release Date"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">Loading...</p>
        )}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <button
          className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-white px-3 sm:px-4 py-2 text-sm sm:text-base">
          Page {page}
        </span>

        <button
          className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded"
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ExplorePage;
