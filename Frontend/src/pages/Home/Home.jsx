import React from 'react'
import './Home.css'
import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/foodDisplay'
const Home = ({ searchquery }) => {
  const [category, setcategory] = useState("All")
  useEffect(() => {
    if (searchquery.length > 0 ) {
      const isMobile = window.innerWidth <= 500; 
      const scrollTop = isMobile ? 415 : 830; 
  
      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [searchquery]);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setcategory={setcategory} />
      <FoodDisplay category={category} searchquery={searchquery} />

    </div>
  )
}

export default Home
