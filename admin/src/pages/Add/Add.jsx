import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
 

  const [image, setImage] = useState(false);
  const [Data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Projects"
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(value);

    setData(Data => ({ ...Data, [name]: value }))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(Data); 
    const formData = new FormData();
    formData.append("name", Data.name)
    formData.append("description", Data.description)
    formData.append("price", Number(Data.price))
    formData.append("category", Data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/component/add`,formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Projects"
      })
      setImage(false)
      toast.success("Component Add")
    }
    else {
      toast.error("Component can't Add")
    }
  }
  // useEffect(()=>{
  //   console.log(Data)
  // },[Data])
  return (
    <div className='add'>
      <form  onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image-( **Image ratio should be 4:3**)</p>
          
          <label htmlFor="image">
            {console.log(image)}
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={Data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={Data.description} name='description' rows="4" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={Data.category} name="category">
            
              <option value="Projects">Projects</option>
              <option value="Capacitors">Capacitors</option>
              <option value="LEDs">LEDs</option>
              <option value="Registers">Registers</option>
              <option value="Microcontrollers">Microcontrollers</option>
              <option value="Sensors">Sensors</option>
              <option value="Wires">Wires</option>
              <option value="Switches">Switches</option>
              <option value="Transistors">Transistors</option>
              <option value="Diodes">Diodes</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={Data.price} type="number" name='price' placeholder='₹99' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>

    </div>
  )
}

export default Add
