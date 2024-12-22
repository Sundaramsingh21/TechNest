import React ,{useState,useContext,useEffect}from 'react'
import './myorders.css'
import {assets} from '../../assets/assets'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
const myOrders = () => {


    const {url,Token} = useContext(StoreContext);
    const [Data, setData] = useState([]);

    const fetchOrders = async ()=>{

        const response = await axios.post(url+"/api/order/userorders",{},{headers:{Token}});
        setData(response.data.data);
        // console.log(response.data.data);
        
    }

    useEffect(() => {
      if(Token){
        fetchOrders();
      }
      
    }, [Token])
    

  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <p style={{"margin-top":"15px"}}>Order details also sent on your email</p>
        <div className="container">
            {Data.map((order,index)=>{
                return(
                    <div key={index} className="my-order-orders">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            //  return item.name+" X "+item.quantity
                            if (index === order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+","
                            }
                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Refresh Order</button>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default myOrders
