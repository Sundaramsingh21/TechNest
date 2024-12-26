import React, { useContext, useState, useEffect } from 'react'
import './CompInfo.css'
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { Items } from '../../assets/Items/Item';
import axios from 'axios';

const CompInfo = () => {

  const { url, AddToCart, cartItems, RemoveFromCart } = useContext(StoreContext)
  const [CompInfo, setCompInfo] = useState([])

  const { id } = useParams();

   window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  const Comploader = async () => {
    try {
      const response = await axios.post(`${url}/api/component/compInfo`, { id });

      if (response.data.success) {
        setCompInfo(response.data.Data);
      }
      else {
        toast.error("Error fetching component details");
      }

    } catch (error) {
      console.error("Error details:", error);
      toast.error("Error updating");
    }

  }

  useEffect(() => {

    const loader = async () => {
      await Comploader();
    }
    loader();

  }, [id]);

 //  let decodedImage;
 //   let decodedName, decodedDescription, decodedImage;

 // try {
 //     decodedName = decodeURIComponent(name);
 //     decodedDescription = decodeURIComponent(description);
 //    decodedImage = decodeURIComponent(image);
 //  } catch (error) {
 //     decodedName = name;
 //     decodedDescription = description;
 //    decodedImage = image;
 //  }
  const itemOutofstock = () => {
    toast.error("Sorry, Item is Out of stock")
  }
  return (
    <>

      <div className='compinfo-container'>
        <div className="item-img">
          {/* <img src={url + "/images/" + CompInfo.image} alt="" /> */}
          {<img src={Items[CompInfo.image]} alt="" />}
        </div>

        <div className="item-details">
          <p id='product-id'>Product Id : ({id})</p>
          <h2>{CompInfo.name}</h2>
          <img src={assets.rating_starts} alt="" />
          <p>₹{CompInfo.price}</p>

          <div className="item-description">
            <p>{CompInfo.description}</p>
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

            (CompInfo.stock === "Out of stock" ? (<button onClick={itemOutofstock}>Add To Cart</button>) : (<button onClick={() => AddToCart(id)}>Add To Cart</button>))}
        </div>

      </div>

    </>


  )
}

export default CompInfo
