import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/inventory/addProduct/addProductSlice';
import showProductReducer from '../components/inventory/productList/showProductSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    showProduct: showProductReducer, // Updated key to match the reducer name
  },
});

export default store;

