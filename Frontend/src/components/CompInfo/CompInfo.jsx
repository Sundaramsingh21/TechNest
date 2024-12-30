import React, { useContext, useState, useEffect } from 'react'
import './CompInfo.css'
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { Items } from '../../assets/Items/Item';
import FrontendLoader from '../FrontendLoader/FrontendLoader';
import CompItem from '../CompItem/CompItem'
import axios from 'axios';

const CompInfo = () => {

  const { url, AddToCart, cartItems, RemoveFromCart, food_list, LoaderF } = useContext(StoreContext)
  const [CompInfo, setCompInfo] = useState([])
  const [imgLoadering, setimgLoadering] = useState(false)

  const { id } = useParams();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  const Comploader = async () => {
    try {

      setimgLoadering(true);
      const response = await axios.post(`${url}/api/component/compInfo`, { id });

      if (response.data.success) {
        setCompInfo(response.data.Data);
        setimgLoadering(false);
      }
      else {
        toast.error("Error fetching component details");
      }

    } catch (error) {
      console.error("Error details:", error);
      toast.error("Error updating");
    }

  }

  const filteredlist = food_list.filter(item =>
    item.category?.toLowerCase().includes(CompInfo.category?.toLowerCase() || "")
  );


  useEffect(() => {

    const loader = async () => {
      await Comploader();

    }
    loader();

  }, [id]);

  const itemOutofstock = () => {
    toast.error("Sorry, Item is Out of stock")
  }

  // let decodedName, decodedDescription, decodedImage;
  // try {
  //   decodedName = decodeURIComponent(name);
  //   decodedDescription = decodeURIComponent(description);
  //   decodedImage = decodeURIComponent(image);
  // } catch (error) {
  //   decodedName = name;
  //   decodedDescription = description;
  //   decodedImage = image;
  // }

  return (
    <>

      <div className='compinfo-container'>
        <div className="item-img">
          {/* <img src={url + "/images/" + CompInfo.image} alt="" /> */}
          {imgLoadering ? <img style={{ width: "120px", margin: "72px 7px", filter: "contrast(0.5)" }} src={assets.picture_loader} alt="" /> : <img src={Items[CompInfo.image]} alt="" />}
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
      <div className='Item-display' id='Item-display'>
        <h2>Recommended</h2>
        {LoaderF ? <FrontendLoader /> : <></>}
        <div className="Item-display-list">
          {filteredlist.map((item, index) => {

            return <CompItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} stock={item.stock} />

          })}
        </div>
      </div>

    </>


  )
}

export default CompInfo
