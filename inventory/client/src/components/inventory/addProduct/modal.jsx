import React, { useState,useEffect} from 'react';
import { Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postProduct } from './addProductSlice';
import { Image,CloudinaryContext } from 'cloudinary-react';
import axios from 'axios';
import {setToken} from '../../../api/authSlice';




const ProductModal = ({ open, onClose}) => {
  const dispatch = useDispatch();
  
  
  
  //-------------

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        console.log('Token:', token);
  
        const tokenPayload = token.split('.')[1];
        const decodedPayload = window.atob(tokenPayload);
        console.log(decodedPayload);
  
        const parsedPayload = JSON.parse(decodedPayload);
        console.log('Decoded Token:', parsedPayload);
  
        if (token) {
          const response = await axios.get('http://localhost:9002/api/admin/admin', {
          // const response = await axios.get('http://localhost:8000/admin/api/admin/admin', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log(`Bearer ${token}`);
  
          const adminData = response.data;
          console.log('Admin Details:', adminData);
  
          // Dispatch the setToken action to store the token in Redux store
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
  
    fetchAdminData();
  }, [dispatch]);
  
  //-------------

    const [product, setProduct] = useState({
    image: '',
    productName: '',
    description: '',
    quantity: 0,
    category: '',
    price: 0,
    supplier:'',
    available:false
  });
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  
  
  
  const handleAddProduct = () => {
    // Dispatch the postProduct action
    dispatch(postProduct(product));
  
    // Reset the form and close the modal
    setProduct({
      image: '',
      productName: '',
      description: '',
      quantity: 0,
      category: '',
      price: 0,
      supplier: '',
      available: false,
    });
  
    onClose();
  };


  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'bmwsygov');
  
    // Make an API call to upload the image to Cloudinary
    fetch('https://api.cloudinary.com/v1_1/dyz7kumjz/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: data.secure_url,
        }));
      })
      .catch((error) => {
        console.error('Error uploading image to Cloudinary:', error);
      });
  };
  




  return (

    <Modal open={open} onClose={onClose} className="modal mt-20">
  <div className="modal-content bg-white p-8 px-10 rounded-2xl shadow-lg max-w-md h-auto mx-auto ">
    
    
  <div className="image-upload">
  <CloudinaryContext cloudName="your_cloud_name">
    <Image publicId={product.image} width="200" height="200" />
  </CloudinaryContext>
  <div>
    <label htmlFor="upload">Upload</label>
    <input
      id="upload"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mb-5"
      hidden
    />
  </div>
</div>

        <div className="flex flex-col items-center">
        <div className="flex mb-5">

        <div >
          <div >
            <TextField
              label="Title"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              className='w-full'
              
            />
          </div>
          
        </div>
      </div>

      <div className="flex">
        <div className="mr-5">
        <div className="mb-4">
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4  items-center">
  <label htmlFor="available" className="block ml-10 font-medium text-gray-400 ">
    Available
  </label>
  <input
    type="checkbox"
    id="available"
    name="available"
    checked={product.available}
    onChange={(e) =>
      setProduct({
        ...product,
        available: e.target.checked,
      })
    }
    className="ml-16 mt-2 form-checkbox h-5 w-5 text-indigo-600"
  />
</div>
          
        </div>

        <div>
          <div className="mb-4">
            <TextField
              label="Price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <TextField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Supplier"
              name="supplier"
              value={product.supplier}
              onChange={handleInputChange}
            />
          </div>
          {/* checkbox */}
          

           
        </div>
      </div>

    </div>

    <div className="flex justify-end">
    <h1
  onClick={handleAddProduct}
  
  className="capitalize mr-5 text-text-gray-600 py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-blue-500 to-teal-200 hover:shadow-lg flex "
>
  add product
</h1>

      
      <h1  onClick={onClose} className="text-text-gray-600 mr-5 py-2 hover:cursor-pointer hover:text-color-1">
                    Cancel
                  </h1>
    </div>
   
  </div>
  
</Modal>

  
  );
};

export default ProductModal;
