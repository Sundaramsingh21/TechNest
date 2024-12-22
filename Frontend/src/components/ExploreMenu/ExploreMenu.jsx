import React from 'react'
import './ExploreMenu.css'
import { menu_list, assets } from '../../assets/assets'
const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div className='explore' id='explore-menu'>
      <div className="upper">
        <h1>Explore the items here</h1>
        <img className='right-arrow' src={assets.right_arrow} alt="" />
      </div>
      <div className="explore-menu-list">
        {menu_list.map((iteam, index) => {
          return (
            <div onClick={() => { setcategory(prev => prev === iteam.menu_name ? "All" : iteam.menu_name) }} key={index} className="explore-menu-item">
              <img className={category === iteam.menu_name ? "active" : ""} src={iteam.menu_image} alt="" />
              <p>{iteam.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
