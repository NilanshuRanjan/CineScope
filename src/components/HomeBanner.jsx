import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../context/DataContext';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HomeBanner = () => {
  const { bannerdata } = useContext(DataContext);

  const [currentimg, setcurrentimg] = useState(0);

  const handlenext = () => {
    setcurrentimg(prev => {
      const length = bannerdata?.results?.length || 0;
      if (length === 0) return 0;
      if (prev < length - 1) return prev + 1;
      return 0;
    });
  };

  const handleprev = () => {
    setcurrentimg(prev => {
      const length = bannerdata?.results?.length || 0;
      if (length === 0) return 0;
      if (prev > 0) return prev - 1;
      return length - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentimg(prev => {
        const length = bannerdata?.results?.length || 0;
        if (length === 0) return 0;
        if (prev < length - 1) return prev + 1;
        return 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerdata]);

  return (
    <>
      {/* ✅ Added margin below header ONLY on mobile */}
      <section className='w-full h-full mt-16 sm:mt-0'>
        <div className='flex min-h-full max-h-[100vh] overflow-hidden relative'>
          {bannerdata?.results?.length > 0 ? (
            bannerdata.results.map((obj) => (
              <div
                key={obj.id + "bannerHome"}
                className='min-h-full min-w-full overflow-hidden transition-all'
                style={{ transform: `translateX(-${currentimg * 100}%)` }}
              >
                <div className='w-full h-full relative z-0'>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${obj.backdrop_path}`}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-0 left-0 w-full h-full z-10 bg-black bg-opacity-15">
                  <div
                    className='absolute 
                      bottom-5 left-5 
                      sm:bottom-10 sm:left-10 
                      p-3 sm:p-4 
                      w-[85%] sm:w-[60%] md:w-[45%] lg:w-[39%]'
                  >
                    {/* Title */}
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                      {obj.title || obj.name}
                    </h1>

                    {/* Description hidden on small screens */}
                    <p className="hidden sm:block mt-2 text-sm sm:text-base md:text-lg">
                      {obj.overview}
                    </p>

                    {/* Rating */}
                    <p className="text-sm sm:text-base md:text-lg mt-3">
                      Rating {obj.vote_average?.toFixed(1)}  
                      {obj.release_date ? ` | Release Date ${obj.release_date}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}

          {/* Left Button */}
          <div className="absolute top-[40%] sm:top-[45%] left-3 sm:left-5 z-10">
            <button className='text-2xl sm:text-3xl font-extrabold' onClick={handleprev}>
              <FaAngleLeft />
            </button>
          </div>

          {/* Right Button */}
          <div className="absolute top-[40%] sm:top-[45%] right-3 sm:right-5 z-10">
            <button className='text-2xl sm:text-3xl font-extrabold' onClick={handlenext}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;
