import React from 'react'
import './List.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({ url }) => {

  const [List, setList] = useState([]);
  const fetchlist = async () => {

    const response = await axios.get(`${url}/api/component/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
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

  useEffect(() => {
    fetchlist();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Components List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p on onClick={() => removeComponent(item._id)} className='cursor'>Remove</p>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
