import React, { useContext } from 'react'
import HomeBanner from '../components/HomeBanner'
import Homepagescroll from '../components/homepagescroll'
import DataContext from '../context/DataContext'

const Home = () => {
  const {topRatedData, upcomingData, trendingseriesData, bollywood, animated} = useContext(DataContext)

  return (
    <>
      <HomeBanner/>
      {/* <homepagescroll data={trendingData} heading={"Trending"} trending={true}/>
      <homepagescroll data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/> */}
      <Homepagescroll data={bollywood.results} heading={"Bollywood Movies"} media_type={"movie"}/>
      <Homepagescroll data={animated.results} heading={"Animated Movies"} media_type={"movie"}/>
      <Homepagescroll data={upcomingData.results} heading={"Upcoming Movies"} media_type={"movie"}/>
      <Homepagescroll data={trendingseriesData.results} heading={"Trending Series"} media_type={"series"}/>
      <Homepagescroll data={topRatedData.results} heading={"Top Rated Movies"} media_type={"movie"}/>
      {/* <homepagescroll data={popularTvShowData} heading={"Popular TV Show"} media_type={"tv"}/>
      <homepagescroll data={onTheAirShowData} heading={"On The Air"} media_type={"tv"}/> */}
    </>
  )
}

export default Home