import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader'


const PlaceOrder = () => {
  const { getTotalCartAmount, Token, food_list, cartItems, url } = useContext(StoreContext);
  const [PaymentShow, setPaymentShow] = useState(false)
  const [LoaderP, setLoaderP] = useState(false);
  const navigate = useNavigate();


  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    utr: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(Data => ({ ...Data, [name]: value }))

  }
  const placeOrder = async (event) => {
    event.preventDefault();
    setLoaderP(true);
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: Data,
      items: orderItems,
      amount: getTotalCartAmount() + 30,
    }

    try {

      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { Token } });
      setLoaderP(false);

      if (response.data.success && Data.utr && Data.phone && Data.email && Data.firstName && Data.city) {

        alert("Order Placed Successfully!");
        navigate('/myorders');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again.");
    }
  }
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Text Copied")

  }

  useEffect(() => {
    if (!Token) {
      navigate('/cart')
    }

  }, [Token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={Data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={Data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={Data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={Data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={Data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={Data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={Data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={Data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={Data.phone} type="text" placeholder='Phone no' />
        <input required name='utr' onChange={onChangeHandler} value={Data.utr} type="text" placeholder='Enter UTR number after payment' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {
                getTotalCartAmount() > 0 ? <p>₹{30}</p> : <p>₹0</p>
              }
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {getTotalCartAmount() > 0 ? <b>₹{getTotalCartAmount() + 30}</b> : <b>₹0</b>}
            </div>
            <div className='payment'>
              {PaymentShow ? (<><img src={assets.QR_code} alt="" />
                <div className="payupi">
                  <b>Or</b>
                  <div className='phonepay'><img src={assets.Phone_pay} alt="" /><p>9175702325@ybl</p><img src={assets.Copy} onClick={() => copyText("9175702325@ybl")} className='Copy' alt="" /></div>

                  <div className='Googlepay'><img src={assets.Googlepay} alt="" /><p>9175702325@ibl</p><img src={assets.Copy} onClick={() => copyText("9175702325@ibl")} className='Copy' alt="" /></div>
                </div></>) : (<></>)}



            </div>
          </div>

          {!PaymentShow ? (
            <a onClick={() => setPaymentShow(true)}>Payment</a>
          ) : (
            // Confirm button will trigger the form submission and run placeOrder
            LoaderP ? <Loader />: <button className='confirm'>Confirm</button>
          )}

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
