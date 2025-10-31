import React, { useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import MovieCard from './MovieCard';

function Homepagescroll({ data = [], heading }) {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className="relative">

        <div
          ref={containerRef}
          className="
            flex gap-6 
            overflow-x-auto 
            overflow-y-hidden 
            scroll-smooth 
            relative z-10
            pb-3
            no-scrollbar
          "
        >
          {data?.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="
                  item 
                  shrink-0 
                  min-w-[140px] 
                  sm:min-w-[160px] 
                  md:min-w-[180px] 
                  lg:min-w-[200px]
                "
              >
                <MovieCard movie={item} />
              </div>
            ))
          ) : (
            <p className="text-white">No data available</p>
          )}
        </div>

        {/* Scroll Buttons (Large screens only) */}
        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Homepagescroll;
