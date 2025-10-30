import React, { useEffect, useState } from "react";
import DataContext from "./DataContext"

const DataProvider = ({children})=>{
    const [bannerdata, setbannerdata] = useState({});
    const [moviesdata, setmoviesdata] = useState({});
    const [seriesdata, setseriesdata] = useState({});
    const [bollywood, setbollywood] = useState({});
    const [animated, setanimated] = useState({});
    const [topRatedData, settoprateddata] = useState({});
    const [upcomingData, setupcomingData] = useState({}); 
    const [trendingseriesData, settredingseriesData] = useState({}); 

    const [isAdultContent, setIsAdultContent] = useState(false);

    const toggleAdultContent = () => {
        setIsAdultContent((prev) => !prev);
    };

    useEffect(() => {
        console.log("Adult Content Mode Changed:", isAdultContent);
    }, [isAdultContent]);

    
    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/movie/top_rated?include_adult=${isAdultContent ? "true" : "false"}&page=1&api_key=23aa4e53c0afee4eae3f5f9282afadd0`;

        fetch(url)
        .then(res => res.json())
        .then(json => settoprateddata(json))
    }
    , [isAdultContent])

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=23aa4e53c0afee4eae3f5f9282afadd0&with_original_language=hi&sort_by=popularity.desc`;

        fetch(url)
        .then(res => res.json())
        .then(json => setbollywood(json))
    }
    , [isAdultContent])

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=23aa4e53c0afee4eae3f5f9282afadd0&with_genres=16&sort_by=popularity.desc`;

        fetch(url)
        .then(res => res.json())
        .then(json => setanimated(json))
    }
    , [isAdultContent])

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/discover/tv?include_adult=${isAdultContent ? "true" : "false"}&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=23aa4e53c0afee4eae3f5f9282afadd0`;

        fetch(url)
        .then(res => res.json())
        .then(json => setseriesdata(json))
    }
    , [isAdultContent])

    

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/movie/upcoming?include_adult=${isAdultContent ? "true" : "false"}&language=en-US&page=1&api_key=23aa4e53c0afee4eae3f5f9282afadd0`;

        fetch(url)
        .then(res => res.json())
        .then(json => setupcomingData(json))
    }
    , [isAdultContent])

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/tv/top_rated?include_adult=${isAdultContent ? "true" : "false"}&language=en-US&page=1&api_key=23aa4e53c0afee4eae3f5f9282afadd0`;

        fetch(url)
        .then(res => res.json())
        .then(json => settredingseriesData(json))
    }
    , [isAdultContent])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/trending/all/week?include_adult=${isAdultContent ? "true" : "false"}&api_key=23aa4e53c0afee4eae3f5f9282afadd0`)
        .then(res => res.json())
        .then(res=>{
            setbannerdata(res);
            console.log(bannerdata)
        })
    },[isAdultContent])

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=${isAdultContent ? "true" : "false"}&page=1&include_video=false&language=en-US&sort_by=popularity.desc&api_key=23aa4e53c0afee4eae3f5f9282afadd0`;
      
        fetch(url)
        .then(res => res.json())
        .then(json => setmoviesdata(json));
      },[isAdultContent])


    return(
        <DataContext.Provider value={{isAdultContent, toggleAdultContent, bannerdata, moviesdata, topRatedData, upcomingData, trendingseriesData, seriesdata, bollywood, animated}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider