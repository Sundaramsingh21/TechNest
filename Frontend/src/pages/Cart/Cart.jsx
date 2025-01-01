import React from 'react'
import './cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import {useNavigate} from 'react-router-dom'
import { Items } from '../../assets/Items/Item'
const cart = () => {

  const { cartItems, food_list, RemoveFromCart, getTotalCartAmount,url } = useContext(StoreContext)
   const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Tittle</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div  className="cart-items-title cart-items-item">
                  <img src={Items[item.image]} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p className='not-allowed'>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => RemoveFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>


            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* <div className="cart-total-details">
              <p>Packaging Fee</p>
              {
                getTotalCartAmount()>0?<p>₹{10}</p>:<p>₹0</p>
              }
              
            </div>
            <hr /> */}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹30</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {getTotalCartAmount()>0?<b>₹{getTotalCartAmount()+30}</b>:<b>₹0</b>}
              
            </div>

          </div>
          {getTotalCartAmount()>0?<button onClick={()=>navigate('/order')}>Proceed To Checkout</button>:<button>Proceed To Checkout</button>}
          
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default cart
