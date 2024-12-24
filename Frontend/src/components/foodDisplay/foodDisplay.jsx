import React, { useContext } from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import CompItem from '../CompItem/CompItem'
import FrontendLoader from '../FrontendLoader/FrontendLoader'

const foodDisplay = ({ category }) => {
  const { food_list ,LoaderF} = useContext(StoreContext)
  return (
    <div className='Item-display' id='Item-display'>
      <h2>Top Items</h2>
      {LoaderF?<FrontendLoader/>:<></>}
      <div className="Item-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <CompItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} stock={item.stock} />
          }
        })}
      </div>
    </div>
  )
}

export default foodDisplay
