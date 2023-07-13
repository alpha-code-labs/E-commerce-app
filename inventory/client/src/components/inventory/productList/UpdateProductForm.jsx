import React, { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';

const UpdateProductModal = ({ product, onUpdate, onCancel, isOpen, open, handleClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: product._id,
    productName: product.productName,
    description: product.description,
    quantity: product.quantity,
    category: product.category,
    price: product.price,
    // imageURL: product.imageURL
    supplier:product.supplier,
    available:product.available

  });

  

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProduct);
    setUpdatedProduct({});
  };

  if (!isOpen) {
    return null; // Don't render the modal if isOpen is false
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-10  rounded-lg shadow-lg p-8"
        style={{ width: '400px' }}
      >
        <Typography variant="h6" className="mb-4">
          Update Product
        </Typography>
        <form onSubmit={handleUpdateSubmit}>
          <label className="block mb-4">
            Product Name:
            <input
              type="text"
              value={updatedProduct.productName || ''}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  productName: e.target.value,
                })
              }
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Description:
            <textarea
              type="text"
              rows={5}
              value={updatedProduct.description || ''}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  description: e.target.value,
                })
              }
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Quantity:
            <input
              type="number"
              value={updatedProduct.quantity || ''}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  quantity: parseInt(e.target.value),
                })
              }
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Category:
            <input
              type="text"
              value={updatedProduct.category || ''}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  category: e.target.value,
                })
              }
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Price:
            <input
              type="number"
              value={updatedProduct.price || ''}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Supplier:
            <input
              type="text"
              value={updatedProduct.supplier || ''}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  supplier: e.target.value,
                })
              }
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
  Available:
  <select
    value={updatedProduct.available === true ? 'true' : 'false'}

    onChange={(e) =>
      setUpdatedProduct({
        ...updatedProduct,
        available: e.target.value === 'true',
      })
    }
    className="border border-gray-300 px-2 py-1 w-full"
  >
    <option value="">Select</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
</label>

          
         

          {/* //// */}
          <div className="flex justify-end">
    <button type="submit"

  
  className="capitalize mr-5 text-text-gray-600 py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-blue-500 to-teal-200 hover:shadow-lg flex "
>
  add product
</button>

      
      <button onClick={onCancel}  className="text-text-gray-600 mr-5 py-2 hover:cursor-pointer hover:text-color-1">
                    Cancel
                  </button>
    </div>
          {/* //// */}
          
        </form>
        
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;
