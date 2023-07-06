import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, deleteProduct, updateProduct } from './showProductSlice';
import UpdateProductModal from './UpdateProductForm';

const ShowProduct = () => {
  const dispatch = useDispatch();
  const showProduct = useSelector((state) => state.showProduct.product);
  const loading = useSelector((state) => state.showProduct.loading);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
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




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProduct, deleteProduct, updateProduct } from './showProductSlice';
// import UpdateProductModal from './UpdateProductForm';

// const ShowProduct = () => {
//   const dispatch = useDispatch();
//   const showProduct = useSelector((state) => state.showProduct.product);
//   const loading = useSelector((state) => state.showProduct.loading);

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

//   const [editMode, setEditMode] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleUpdate = (product) => {
//     setSelectedProduct(product);
//     setEditMode(true);
//   };

//   const handleUpdateSubmit = (updatedProduct) => {
//     dispatch(updateProduct(updatedProduct));
//     setEditMode(false);
//     setSelectedProduct(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {showProduct.map((product) => (
//         <div
//           key={product._id}
//           className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8 text-center"
//         >
//           <img
//             src={product.image}
//             className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
//             alt="productimg"
//           />
//           <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
//             <div className='ml-5'>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2 ">Name</h2>
//               <p className="text-gray-600 mb-2">{product.productName}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2 text-center">Description</h2>
//               <p className="text-gray-600 mb-2">{product.description}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
//               <p className="text-gray-600 mb-2">{product.quantity}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
//               <p className="text-gray-600 mb-2 ml-2">{product.category}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
//               <p className="text-gray-600 mb-2">₹{product.price}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Supplier</h2>
//               <p className="text-gray-600 mb-2 capitalize">{product.supplier}</p>
//             </div>
//             <div>
//   <h2 className="text-xl text-blue-900 font-semibold mb-2">Available</h2>
//   <p className={`text-gray-600 mb-2 capitalize ${product.available ? "text-green-500" : "text-red-500"}`}>
//     {product.available ? "Yes" : "No"}
//   </p>
// </div>


//             <div className="update details flex flex-col space-y-2">
//               {selectedProduct && selectedProduct._id === product._id ? (
//                 <UpdateProductModal
//                   product={selectedProduct}
//                   onUpdate={handleUpdateSubmit}
//                   onCancel={() => {
//                     setEditMode(false);
//                     setSelectedProduct(null);
//                   }}
//                   isOpen={editMode} // Pass the editMode as isOpen prop
//                   open={editMode} // Pass the editMode as open prop
//                   handleClose={() => {
//                     setEditMode(false);
//                     setSelectedProduct(null);
//                   }}
//                 />
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleUpdate(product)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowProduct;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProduct, deleteProduct, updateProduct } from './showProductSlice';
// import UpdateProductModal from './UpdateProductForm';

// const ShowProduct = () => {
//   const dispatch = useDispatch();
//   const showProduct = useSelector((state) => state.showProduct.product);
//   const loading = useSelector((state) => state.showProduct.loading);

  

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

//   const [editMode, setEditMode] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleUpdate = (product) => {
//     setSelectedProduct(product);
//     setEditMode(true);
//   };

//   const handleUpdateSubmit = (updatedProduct) => {
//     dispatch(updateProduct(updatedProduct));
//     setEditMode(false);
//     setSelectedProduct(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {showProduct.map((product) => (
//         <div
//           key={product._id}
//           className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8 text-center"
//         >
//           <img
//             src={product.image}
//             className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
//             alt="productimg"
//           />
//           <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Name</h2>
//               <p className="text-gray-600 mb-2">{product.productName}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2 text-center">Description</h2>
//               <p className="text-gray-600 mb-2">{product.description}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
//               <p className="text-gray-600 mb-2">{product.quantity}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
//               <p className="text-gray-600 mb-2 ml-2">{product.category}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
//               <p className="text-gray-600 mb-2">₹{product.price}</p>
//             </div>

//             <div className="update details flex flex-col space-y-2">
//               {selectedProduct && selectedProduct._id === product._id ? (
//                 <UpdateProductModal
//                   product={selectedProduct}
//                   onUpdate={handleUpdateSubmit}
//                   onCancel={() => {
//                     setEditMode(false);
//                     setSelectedProduct(null);
//                   }}
//                   isOpen={editMode} // Pass the editMode as isOpen prop
//                 />
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleUpdate(product)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowProduct;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProduct, deleteProduct, updateProduct } from './showProductSlice';
// import UpdateProductModal from './UpdateProductForm';

// const ShowProduct = () => {
//   const dispatch = useDispatch();
//   const showProduct = useSelector((state) => state.showProduct.product);
//   const loading = useSelector((state) => state.showProduct.loading);

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

//   const handleUpdate = (product) => {
//     setUpdatedProduct({
//       _id: product._id,
//       productName: product.productName,
//       description: product.description,
//       quantity: product.quantity,
//       category: product.category,
//       price: product.price,
//     });
//     setEditMode(true);
//   };

//   const handleUpdateSubmit = (updatedProduct) => {
//     dispatch(updateProduct(updatedProduct));
//     setUpdatedProduct({});
//     setEditMode(false);
//   };

//   const [editMode, setEditMode] = useState(false);
//   const [updatedProduct, setUpdatedProduct] = useState({});

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {showProduct.map((product) => (
//         <div
//           key={product._id}
//           className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8 text-center"
//         >
//           <img
//             src={product.image}
//             className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
//             alt="productimg"
//           />
//           <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Name</h2>
//               <p className="text-gray-600 mb-2">{product.productName}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2 text-center">Description</h2>
//               <p className="text-gray-600 mb-2">{product.description}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
//               <p className="text-gray-600 mb-2">{product.quantity}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
//               <p className="text-gray-600 mb-2 ml-2">{product.category}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
//               <p className="text-gray-600 mb-2">₹{product.price}</p>
//             </div>
//             <div className="update details flex flex-col space-y-2">
//             {editMode ? (
//   <UpdateProductModal
//     product={product}
//     onUpdate={handleUpdateSubmit}
//     onCancel={() => {
//       setUpdatedProduct({});
//       setEditMode(false);
//     }}
//     isOpen={editMode} // Pass the editMode as isOpen prop
//   />
// ) : (
//   <>
//     <button
//       onClick={() => handleUpdate(product)}
//       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//     >
//       Update
//     </button>
//     <button
//       onClick={() => handleDelete(product._id)}
//       className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
//     >
//       Delete
//     </button>
//   </>
// )}

//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowProduct;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProduct, deleteProduct, updateProduct } from './showProductSlice';

// const ShowProduct = () => {
//   const dispatch = useDispatch();
//   const showProduct = useSelector((state) => state.showProduct.product);
//   const loading = useSelector((state) => state.showProduct.loading);

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

//   const handleUpdate = (product) => {
//     setUpdatedProduct({
//       _id: product._id,
//       productName: product.productName,
//       description: product.description,
//       quantity: product.quantity,
//       category: product.category,
//       price: product.price,
//     });
//     setEditMode(true);
//   };

//   const handleUpdateSubmit = () => {
    
    
//     dispatch(updateProduct(updatedProduct));
//     setUpdatedProduct({});
//     setEditMode(false);
//   };

//   const [editMode, setEditMode] = useState(false);
//   const [updatedProduct, setUpdatedProduct] = useState({});

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {showProduct.map((product) => (
//         <div
//           key={product._id}
//           className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8 text-center"
//         >
//           <img
//             src={product.image}
//             className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
//             alt="productimg"
//           />
//           <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Name</h2>
//               <p className="text-gray-600 mb-2">{product.productName}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2 text-center">Description</h2>
//               <p className="text-gray-600 mb-2">{product.description}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
//               <p className="text-gray-600 mb-2">{product.quantity}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
//               <p className="text-gray-600 mb-2 ml-2">{product.category}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
//               <p className="text-gray-600 mb-2">₹{product.price}</p>
//             </div>
//             <div className="update details flex flex-col space-y-2">
//               {editMode ? (
//                 <>
//                   <div className="modal">
//                     <h2>Update Product</h2>
//                     <form onSubmit={handleUpdateSubmit}>
//                       <label>
//                         Product Name:
//                         <input
//                           type="text"
//                           value={updatedProduct.productName || ''}
//                           onChange={(e) =>
//                             setUpdatedProduct({
//                               ...updatedProduct,
//                               productName: e.target.value,
//                             })
//                           }
//                         />
//                       </label>
//                       <label>
//                         Description:
//                         <input
//                           type="text"
//                           value={updatedProduct.description || ''}
//                           onChange={(e) =>
//                             setUpdatedProduct({
//                               ...updatedProduct,
//                               description: e.target.value,
//                             })
//                           }
//                         />
//                       </label>
//                       <label>
//                         Quantity:
//                         <input
//                           type="number"
//                           value={updatedProduct.quantity || ''}
//                           onChange={(e) =>
//                             setUpdatedProduct({
//                               ...updatedProduct,
//                               quantity: parseInt(e.target.value),
//                             })
//                           }
//                         />
//                       </label>
//                       <label>
//                         Category:
//                         <input
//                           type="text"
//                           value={updatedProduct.category || ''}
//                           onChange={(e) =>
//                             setUpdatedProduct({
//                               ...updatedProduct,
//                               category: e.target.value,
//                             })
//                           }
//                         />
//                       </label>
//                       <label>
//                         Price:
//                         <input
//                           type="number"
//                           value={updatedProduct.price || ''}
//                           onChange={(e) =>
//                             setUpdatedProduct({
//                               ...updatedProduct,
//                               price: parseFloat(e.target.value),
//                             })
//                           }
//                         />
//                       </label>
//                       <button type="submit">Save</button>
//                       <button
//                         onClick={() => {
//                           setUpdatedProduct({});
//                           setEditMode(false);
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </form>
//                   </div>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => handleUpdate(product)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//                 >
//                   Update
//                 </button>
//               )}

//               <button
//                 onClick={() => handleDelete(product._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowProduct;



// import React, { useEffect , useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProduct ,deleteProduct,updateProduct} from './showProductSlice';

// const ShowProduct = () => {
//   const dispatch = useDispatch();
//   const showProduct = useSelector((state) => state.showProduct.product);
//   const loading = useSelector((state) => state.showProduct.loading);

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

//   const handleUpdate = (product) => {
//     // Implement your update functionality here
//     // You can display a form or modal to capture updated data

//     // Example: Using state to capture updated data
//     if(product._id){
//     setUpdatedProduct({
//       _id: product._id,
//       productName: product.productName,
//       description: product.description,
//       quantity: product.quantity,
//       category: product.category,
//       price: product.price,
//     });

//     setEditMode(true);
//   }
//   };
//   const handleUpdateSubmit = () => {
//     // Dispatch the updateProduct action with the updated product data
//     dispatch(updateProduct(updatedProduct));

//     // Reset the updated product data and exit edit mode
//     setUpdatedProduct({});
//     setEditMode(false);
//   };

//   const [editMode, setEditMode] = useState(false);
//   const [updatedProduct, setUpdatedProduct] = useState({});


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {showProduct.map((product) => (
//         <div
//           key={product._id}
//           className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8 text-center"
//         >
//           <img
//             src={product.image}
//             className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
//             alt="productimg"
//           />
//           <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Name</h2>
//               <p className="text-gray-600 mb-2">{product.productName}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2 text-center">Description</h2>
//               <p className="text-gray-600 mb-2">{product.description}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
//               <p className="text-gray-600 mb-2">{product.quantity}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
//               <p className="text-gray-600 mb-2 ml-2" >{product.category}</p>
//             </div>
//             <div>
//               <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
//               <p className="text-gray-600 mb-2 ">₹{product.price}</p>
//             </div>
//             <div className="flex flex-col space-y-2">
//             {/* Conditional rendering based on edit mode */}
//             {editMode ? (
//               <>
//                 <div className="modal">
//     <h2>Update Product</h2>
//     <form onSubmit={handleUpdateSubmit}>
//       <label>
//         Product Name:
//         <input
//           type="text"
//           value={updatedProduct.productName || ''}
//           onChange={(e) =>
//             setUpdatedProduct({
//               ...updatedProduct,
//               productName: e.target.value,
//             })
//           }
//         />
//       </label>
//       <label>
//         Description:
//         <input
//           type="text"
//           value={updatedProduct.description || ''}
//           onChange={(e) =>
//             setUpdatedProduct({
//               ...updatedProduct,
//               description: e.target.value,
//             })
//           }
//         />
//       </label>
//       <label>
//         Quantity:
//         <input
//           type="number"
//           value={updatedProduct.quantity || ''}
//           onChange={(e) =>
//             setUpdatedProduct({
//               ...updatedProduct,
//               quantity: parseInt(e.target.value),
//             })
//           }
//         />
//       </label>
//       <label>
//         Category:
//         <input
//           type="text"
//           value={updatedProduct.category || ''}
//           onChange={(e) =>
//             setUpdatedProduct({
//               ...updatedProduct,
//               category: e.target.value,
//             })
//           }
//         />
//       </label>
//       <label>
//         Price:
//         <input
//           type="number"
//           value={updatedProduct.price || ''}
//           onChange={(e) =>
//             setUpdatedProduct({
//               ...updatedProduct,
//               price: parseFloat(e.target.value),
//             })
//           }
//         />
//       </label>
//       <button type="submit">Save</button>
//       <button
//         onClick={() => {
//           setUpdatedProduct({});
//           setEditMode(false);
//         }}
//       >
//         Cancel
//       </button>
//       </form>
//       </div>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleUpdate(product)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//               >
//                 Update
//               </button>
//             )}

//             <button
//               onClick={() => handleDelete(product._id)}
//               className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
//             >
//               Delete
//             </button>
//           </div>
//             {/* <div className="flex flex-col space-y-2">
//               <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
//                 Update
//               </button>
//               <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
//                 Delete
//               </button>
//             </div> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowProduct;



// // import React,{useEffect} from 'react';
// // import { useDispatch,useSelector } from 'react-redux';
// // import { fetchProduct } from './showProductSlice';

// // const ShowProduct = () => {
// //   const dispatch=useDispatch();
// //   const showproducts= useSelector((state)=>state.showproducts)

// //   useEffect(()=>{
// //     dispatch(fetchProduct())

// //   },[])


// //   return (
// //     <>
// //     <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl p-4 mb-4 m-8">
// //       <img src="https://img.freepik.com/free-psd/realistic-mobile-device-isolated_23-2150427379.jpg?w=900&t=st=1687942920~exp=1687943520~hmac=afd7b5a9f0f1e0c8764b52fdb49af3bb50b6d8271da4629a4da1029b8ae1053d" className="w-40 h-40 object-cover items-center rounded-md md:mr-4"
// //       alt='productimg'/>
// //       <div className="flex flex-col flex-grow md:flex-row md:items-center md:justify-between">
// //         <div>
// //           <h2 className="text-xl text-blue-900 font-semibold mb-2">Name</h2>
// //           <p className="text-gray-600 mb-2">Samsung Galaxy</p>
// //         </div>
  
// //         <div >
// //           <h2 className="text-xl text-blue-900 font-semibold mb-2">Description</h2>
// //           <p className="text-gray-600 mb-2">discription......</p>
// //         </div>
// //         <div>
// //           <h2 className="text-xl text-blue-900 font-semibold mb-2">Quantity</h2>
// //           <p className="text-gray-600 mb-2">103</p>
// //         </div>
// //         <div>
// //           <h2 className="text-xl text-blue-900 font-semibold mb-2">Category</h2>
// //           <p className="text-gray-600 mb-2">Smartphone</p>
// //         </div>
// //         <div>
// //           <h2 className="text-xl text-blue-900 font-semibold mb-2">Price₹</h2>
// //           <p className="text-gray-600 mb-2">₹2000</p>
// //         </div>
// //         <div className="flex flex-col space-y-2">
// //           <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
// //             Update
// //           </button>
// //           <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
// //             Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   </>
  
  
// //   )
// // }

// // export default ShowProduct