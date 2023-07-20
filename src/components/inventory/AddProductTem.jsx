import React, { useState } from 'react';
import ProductModal from './addProduct/modal';

import Profile from './Profile';

const AddProductTem = () => {

///aboutmodal

const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

///aboutmodal


  return (
    <section className="flex flex-col md:flex-row">
    <div className="h-96 m-6 md:w-2/3 p-8 md:pr-4 bg-gradient-to-tr from-blue-500 to-teal-200 rounded-md flex items-center shadow-2xl">
      <div>
        <h2 className="text-blue-900 text-4xl">ShopXpress</h2>
        <p className="text-grey-200 mt-4 capitalize font-thin tracking-wider leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dolore?
        </p>
        <button
          onClick={handleOpen}
          className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
        >
          add product
        </button>
        
  <ProductModal open={open} onClose={handleClose} />
      

        
      </div>
    </div>
    <Profile className="md:w-1/2  h-8" />
  </section>
  )
}

export default AddProductTem
