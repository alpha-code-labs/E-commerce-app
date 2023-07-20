import React from 'react';
import Navbar from '../../navbar/Navbar';
import ShowProduct from './productList/ShowProduct';
import AddProductTem from './AddProductTem';

const AddProduct = () => {
  return (
    <>
    
      <Navbar />
       <main>
       <AddProductTem />
      <ShowProduct />
      </main>
    </>
  );
};

export default AddProduct;

