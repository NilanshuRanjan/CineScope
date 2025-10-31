import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { type, id } = useParams();

  const [data, setData] = useState({});
  const [castData, setCastData] = useState({});
  const [showPlayer, setShowPlayer] = useState(false);

  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // ✅ FIXED: Correct endpoint logic
  const endpoint = type === "tv" ? "tv" : "movie";

  // ✅ Fetch main details
  useEffect(() => {
    if (!id) return;

    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${api_key}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error fetching details:", err));
  }, [id, type]);

  // ✅ Fetch credits
  useEffect(() => {
    if (!id) return;

    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}/credits?api_key=${api_key}`)
      .then(res => res.json())
      .then(json => setCastData(json))
      .catch(err => console.error("Error fetching credits:", err));
  }, [id, type]);

  // ✅ Video player URLs fixed
  const videoUrl =
    type === "tv"
      ? `https://vidsrc-embed.ru/embed/tv?tmdb=${id}`
      : `https://vidsrc-embed.ru/embed/movie?tmdb=${id}`;

  const handlePlayVideo = () => {
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="relative">

      {/* ✅ Video Player Modal */}
      {showPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-video">
            <iframe
              src={videoUrl}
              title="Video Player"
              allowFullScreen
              className="w-full h-full rounded-lg border-2 border-neutral-700"
            ></iframe>
            <button
              onClick={closePlayer}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ✅ Backdrop Image */}
      <div className='w-full h-[480px] relative hidden lg:block overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={data.title || data.name}
          className='h-full w-full object-cover object-center scale-105 blur-[1px]'
        />
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 '>

        {/* ✅ Poster + Play Button */}
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className='h-80 w-60 object-cover rounded'
          />
          <button
            onClick={handlePlayVideo}
            className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'
          >
            Play Now
          </button>
        </div>

        {/* ✅ Text Details */}
        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white '>
            {data.title || data.name}
          </h2>

          <p className='text-neutral-400'>{data.tagline}</p>

          <div className='flex items-center gap-3'>
            <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>Views : {Number(data.vote_count)}</p>
          </div>

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data.overview}</p>

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>Status : {data.status}</p>
              <span>|</span>

              {/* ✅ Correct release date for TV */}
              <p>
                Release Date : {data.release_date || data.first_air_date}
              </p>

              <span>|</span>

              {/* ✅ Revenue is movie-only, avoid NaN */}
              <p>Revenue : {data.revenue ? Number(data.revenue) : "N/A"}</p>
            </div>
          </div>

          {/* ✅ Crew + Cast */}
          <div>
            {castData && castData.crew ? (
              <div>
                <p>
                  <span className='text-white'>Director</span>:
                  {castData.crew.find(c => c.job === "Director")?.name || "N/A"}
                </p>

                <h2 className='font-bold text-lg'>Cast:</h2>

                <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
                  {castData.cast
                    ?.filter(el => el.profile_path)
                    .map((starCast, index) => (
                      <div key={index}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${starCast.profile_path}`}
                          className='w-24 h-24 object-cover rounded-full'
                        />
                        <p className='font-bold text-center text-base text-neutral-400'>
                          {starCast.name}
                        </p>
                        <p className='font-bold text-center text-xs text-neutral-400'>
                          ({starCast.character})
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <p>"Not Available"</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Details;
