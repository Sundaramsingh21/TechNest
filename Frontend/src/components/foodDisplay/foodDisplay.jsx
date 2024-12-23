import React, { useContext } from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import CompItem from '../CompItem/CompItem'
import Loader from '../../../../admin/src/components/Loader/Loader'
const foodDisplay = ({ category }) => {
  const { food_list ,LoaderF} = useContext(StoreContext)
  return (
    <div className='Item-display' id='Item-display'>
      <h2>Top Items</h2>
      <center>{LoaderF?<Loader/>:<></>}</center>
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
