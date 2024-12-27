import React from 'react'
import './List.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
const List = ({ url }) => {
  const [LoaderL, setLoaderL] = useState(false)
  const [List, setList] = useState([]);
  const [Price, setPrice] = useState({ price: "" })
  const fetchlist = async () => {
    setLoaderL(true)
    const response = await axios.get(`${url}/api/component/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
      setLoaderL(false)
    }
    else {
      toast.error("Compontents can't load")
    }
  }

  const removeComponent = async (ComponentId) => {
    const a = confirm("By clicking on Ok item will remove");
    if (a) {
      const response = await axios.post(`${url}/api/component/remove`, { id: ComponentId });
      await fetchlist();
      if (response.data.success) {
        toast.success("Removed");

      }
      else {
        toast.error("Error");
      }

    }

  }
  let onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPrice(Price => ({ ...Price, [name]: value }))
  }
  const updatePrice = async (Id) => {
    let a = confirm("Do you want to update the price")
    if (a && Price.price!=0) {
      const response = await axios.post(`${url}/api/component/update`, { id: Id, price: Price.price });
      await fetchlist();
      Price.price = "";
      if (response.data.success) {
        toast.success("Updated Successfully");

      }
    }
    else {
      toast.error("Error")
    }
  }
  const statusHandler = async (event, Id) => {
    try {
      const response = await axios.post(`${url}/api/component/update/stock`, { Id, stock: event.target.value });
      if (response.data.success) {
        toast.success("updated")
        fetchlist();
        
      } else {
        toast.error("Failed to update stock status");
      }
    } catch (error) {
      console.error("Error details:", error); // Log full error details
      toast.error("Error updating");
    }
  }

  useEffect(() => {
    fetchlist();

  }, [])

  return (
    <div className='list add flex-col'>
      <div className="list-head">
        <p>All Components List</p>
        <input onChange={onChangeHandeler} value={Price.price} name='price' type="text" placeholder='Enter new price' />
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          <b>Update</b>
        </div>
        <center>{LoaderL ? <Loader /> : <></>}</center>

        {List.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p style={{overflow: 'hidden'}} >{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <div className='button-action'>
                <p onClick={() => removeComponent(item._id)} className='delete-btn'>Delete</p>
                <p onClick={() => updatePrice(item._id)} className='cursors'>Update</p>
              </div>
              <select onChange={(event) => statusHandler(event, item._id)} value={item.stock}>
                <option value="In stock">In stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
