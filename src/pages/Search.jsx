import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

const Search = () => {
  const location = useLocation();
  const search = location.pathname.slice(10);
  const [moviesdata, setmoviedata] = useState([]);
  const [page, setPage] = useState(1);
  const { isAdultContent, toggleAdultContent} = useContext(DataContext);
  const navigate = useNavigate()
  const api_key = import.meta.env.VITE_API_KEY

  useEffect(()=>{
    setPage(1);
  }, [location])

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=${isAdultContent ? "true" : "false"}&language=en-US&page=${page}&api_key=${api_key}`;

    fetch(url)
      .then(res => res.json())
      .then(json => setmoviedata(json));
  }, [location, page, isAdultContent]);

  const handleClick = (movie) => {
    const type =
    movie.media_type ||
    (movie.title ? "movie" : "series");

    navigate(`/details/${type}/${movie.id}`);
  };

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }, [page]);

  return (
    <section className="explore-page pt-20 px-10">
      <h1 className="text-center text-4xl font-bold mb-8">Search</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {moviesdata && moviesdata.results && moviesdata.results.length > 0 ? (
          moviesdata.results.map((movie) => (
            <div key={movie.id} className="movie-card relative overflow-hidden rounded-lg shadow-lg"
            onClick={() => handleClick(movie)}
            >
              <img
                className="w-full h-[300px] object-cover"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg">{movie.title || movie.name}</h3>
                <p className="text-sm">{movie.release_date ? `Release Date: ${movie.release_date}` : "No Release Date"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button 
          className="bg-gray-700 text-white px-4 py-2 rounded mx-2 disabled:opacity-50" 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white px-4 py-2">Page {page}</span>
        <button 
          className="bg-gray-700 text-white px-4 py-2 rounded mx-2" 
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Search;
