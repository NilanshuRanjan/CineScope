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
      if (prev < length - 1) {
        return prev + 1;
      }
      return 0;
    });
  };

  const handleprev = () => {
    setcurrentimg(prev => {
      const length = bannerdata?.results?.length || 0;
      if (length === 0) return 0;
      if (prev > 0) {
        return prev - 1;
      }
      return length - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentimg(prev => {
        const length = bannerdata?.results?.length || 0;
        if (length === 0) return 0;
        if (prev < length - 1) {
          return prev + 1;
        }
        return 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerdata]);

  return (
    <>
      <section className='w-full h-full'>
        <div className='flex min-h-full max-h-[100vh] overflow-hidden'>
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
                  />
                </div>

                <div className="absolute top-0 left-0 w-full h-full z-10 bg-black bg-opacity-15">
                  <div className='absolute bottom-10 left-10 p-4 w-[39%]'>
                    <h1 className="text-white text-4xl font-bold">{obj.title || obj.name}</h1>
                    <p><br /></p>
                    <p>{obj.overview}</p>
                    <br />
                    <p>
                      Rating {obj.vote_average?.toFixed(1)} | Release Date {obj.release_date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}

          <div className="absolute top-[45%] left-5 z-10">
            <button onClick={handleprev} className='text-3xl font-extrabold'>
              <FaAngleLeft />
            </button>
          </div>

          <div className="absolute top-[45%] right-5 z-10">
            <button onClick={handlenext} className='text-3xl font-extrabold'>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;
