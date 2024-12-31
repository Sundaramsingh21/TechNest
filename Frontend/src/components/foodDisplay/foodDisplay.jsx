import React, { useContext} from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import CompItem from '../CompItem/CompItem'
import FrontendLoader from '../FrontendLoader/FrontendLoader'


const foodDisplay = ({ category, searchquery }) => {
  const { food_list, LoaderF } = useContext(StoreContext)

  // const filteredlist = food_list.filter(item =>
  //   searchquery === "" || item.name.toLowerCase().includes(searchquery.toLowerCase())
  // );

  const filteredlist = food_list.filter(item => {
    const queryWords = searchquery.toLowerCase().split(/\s+/); 
    const name = item.name.toLowerCase();
    // const description = item.description ? item.description.toLowerCase() : "";
    const category = item.category ? item.category.toLowerCase() : "";
    const id = item._id.toLowerCase();
    return (
      searchquery === "" ||
      queryWords.some(word => name.includes(word) || category.includes(word) || id.includes(word))
    );
  });

  return (
    <div className='Item-display' id='Item-display'>
      <h2>Top Items</h2>
      {LoaderF ? <FrontendLoader /> : <></>}
      <div className="Item-display-list">
        {filteredlist.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <CompItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} stock={item.stock} />
          }
        })}
      </div>
    </div>
  )
}

export default foodDisplay
