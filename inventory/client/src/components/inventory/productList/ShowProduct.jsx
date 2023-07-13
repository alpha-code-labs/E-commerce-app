import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, deleteProduct, updateProduct } from './showProductSlice';
import UpdateProductModal from './UpdateProductForm';

const ShowProduct = () => {
  const dispatch = useDispatch();
  const showProduct = useSelector((state) => state.showProduct.product);
  const loading = useSelector((state) => state.showProduct.loading);
  const token = useSelector((state) => state.auth.token); 

  useEffect(() => {
    dispatch(fetchProduct(token));
  }, [dispatch,token]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId,token));
  };

  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const handleUpdateSubmit = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    setEditMode(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {showProduct.map((product) => (
        <div
          key={product._id}
          className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8 text-center"
        >
          <img
            src={product.image}
            className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
            alt="productimg"
          />
          <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
            <div className="ml-5">
              <h2 className="text-xl text-blue-900 font-semibold mb-2 ">Name</h2>
              <p className="text-gray-600 mb-2">{product.productName}</p>
            </div>
            <div>
              <h2 className="text-xl text-blue-900 font-semibold mb-2 text-center">Description</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
            </div>
            <div>
  <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
  <p className={`text-gray-600 mb-2 ${product.quantity === 0 ? 'text-red-500 font-semibold' : ''}`}>
    {product.quantity === 0 ? 'Out of stock' : product.quantity}
  </p>
</div>

           
            <div>
              <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
              <p className="text-gray-600 mb-2 ml-2">{product.category}</p>
            </div>
            <div>
              <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
              <p className="text-gray-600 mb-2">₹{product.price}</p>
            </div>
           
            <div>
              <h2 className="text-xl text-blue-900 font-semibold mb-2">Supplier</h2>
              <p className="text-gray-600 mb-2 capitalize">{product.supplier}</p>
            </div>
            <div>
              <h2 className="text-xl text-blue-900 font-semibold mb-2">Available</h2>
              <p className={`text-gray-600 mb-2 capitalize ${product.available ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}`}>
                {product.available ? "Yes" : "No"}
              </p>
            </div>
           
            <div className="update details flex flex-col space-y-2">
              {selectedProduct && selectedProduct._id === product._id ? (
                <UpdateProductModal
                  product={selectedProduct}
                  onUpdate={handleUpdateSubmit}
                  onCancel={() => {
                    setEditMode(false);
                    setSelectedProduct(null);
                  }}
                  isOpen={editMode} // Pass the editMode as isOpen prop
                  open={editMode} // Pass the editMode as open prop
                  handleClose={() => {
                    setEditMode(false);
                    setSelectedProduct(null);
                  }}
                />
              ) : (
                <>
                  <button
                    onClick={() => handleUpdate(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowProduct;


