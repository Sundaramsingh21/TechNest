import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [Orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("Order Placed"); // Set default filter value

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  }
  const removeComponent = async (ComponentId) => {
    try {
      const response = await axios.post(`${url}/api/order/delete`, { id: ComponentId });
      if (response.data.success) {
        toast.success("Order removed");
        fetchAllOrders(); // Refresh the orders list
      } else {
        toast.error("Error removing order");
      }
    } catch (error) {
      toast.error("Failed to remove order");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = Orders.filter(order => order.status === orderType);

  return (
    <div className='order add'>
      <div className="choose">
        <h3>Orders</h3>
        <select onChange={(e) => setOrderType(e.target.value)} value={orderType}>
          <option value="Order Placed">Order Placed</option>
          <option value="Order Confirm">Order Confirm</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Delivery available Now">Delivery available Now</option>
        </select>
      </div>

      <div className="order-list">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order-item-component'>
                {order.items.map((item, i) => (
                  `${item.name} x ${item.quantity}${i === order.items.length - 1 ? '' : ', '}`
                ))}
              </p>
              <p className="order-item-name">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <b>UTR : {order.address.utr}</b>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Order Confirm">Order Confirm</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Delivery available Now">Delivery available Now</option>
            </select>
            <p on onClick={() => removeComponent(order._id)} className='cursor'>Delete</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Orders;
