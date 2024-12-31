import React, { useState, useContext, useEffect } from 'react'
import './myorders.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
const myOrders = () => {


    const { url, Token } = useContext(StoreContext);
    const [Data, setData] = useState([]);
    const [LoaderO, setLoaderO] = useState(false);

    const fetchOrders = async () => {
        setLoaderO(true)
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { Token } });
        setData(response.data.data);
        // console.log(response.data.data);
        setLoaderO(false)

    }

    useEffect(() => {
        if (Token) {
            fetchOrders();
        }

    }, [Token])


    return (
        <div className='myorders'>
            <h2>My Order's</h2>
            <p style={{ marginTop: "15px", fontSize :"13px"  }}>Order details also sent on your email. If not found also check spam folder.</p>
            <div className="container">
                {Data.length === 0 && !LoaderO &&<center><p>No orders found.</p></center>}
                {Data.map((order, index) => {
                    return (
                        <>
                            <div key={index}>
                                <div className="order-date">
                                    <p>{order.current_date}</p>
                                </div>
                                <div className="my-order-orders">
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>{order.items.map((item, index) => {
                                        //  return item.name+" X "+item.quantity
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ","
                                        }
                                    })}</p>
                                    <p>₹{order.amount}.00</p>
                                    <p>Items: {order.items.length}</p>
                                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                    <button onClick={fetchOrders}>Refresh Order</button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>

        </div>

    )
}

export default myOrders
