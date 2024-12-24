import React, { useContext, useState, useEffect } from 'react'
import './CompInfo.css'
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { Items } from '../../assets/Items/Item';

const CompInfo = () => {

  const { url, AddToCart, cartItems, RemoveFromCart } = useContext(StoreContext)

  const { id, name, price, description, image, stock } = useParams();

  const itemOutofstock = () => {
    toast.error("Sorry, Item is Out of stock")
  }
  return (
    <>

      <div className='compinfo-container'>
        <div className="item-img">
          {/* <img src={url + "/images/" + CompInfo.image} alt="" /> */}
          <img src={Items[image]} alt="" />
        </div>

        <div className="item-details">
          <p id='product-id'>Product Id : ({id})</p>
          <h2>{name}</h2>
          <img src={assets.rating_starts} alt="" />
          <p>₹{price}</p>

          <div className="item-description">
            <p>{description}</p>
          </div>
          {cartItems[id] ?
            (<><div className="add-remove">
              <div onClick={() => RemoveFromCart(id)} className="operation1">
                <p>-</p>
              </div>
              <p>{cartItems[id]}</p>
              <div onClick={() => AddToCart(id)} className="operation2">
                <p>+</p>
              </div>
            </div>
              <p style={{ fontSize: "small", color: "#676767" }}>
                Add quantities you want, it will automatically added to Cart.
              </p>
              <button id='add-button-disable'>Add To Cart</button></>
            ) :

            (stock === "Out of stock" ? (<button onClick={itemOutofstock}>Add To Cart</button>) : (<button onClick={() => AddToCart(id)}>Add To Cart</button>))}
        </div>

      </div>

    </>


  )
}

export default CompInfo
