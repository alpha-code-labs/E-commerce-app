import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/inventory/addProduct/addProductSlice';
import showProductReducer from '../components/inventory/productList/showProductSlice';
import authReducer from '../api/authSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    showProduct: showProductReducer, 
    auth: authReducer,
  },
});

export default store;

