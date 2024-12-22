import React from 'react'
import './Home.css'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
// import ItemDisplay from '../../components/foodDisplay/foodDisplay'
import FoodDisplay from '../../components/foodDisplay/foodDisplay'
const Home = () => {
  const [category, setcategory] = useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
       {/* <ItemDisplay category={category}/> */}
       <FoodDisplay category={category}/>
       
    </div>
  )
}

export default Home
