import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/api';

export const deleteProduct = createAsyncThunk(
  'showProduct/deleteProduct',
  async (productId, { dispatch,getState }) => {
    try {
      const { token } = getState().auth;
      console.log(token,'from slicer delete'); // Log the token value

      
      await api.delete(`/products/${productId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteProductSuccess(productId));
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
    }
  }
);

export const updateProduct = createAsyncThunk(
  'showProduct/updateProduct',
  async (productData, { dispatch,getState }) => {
    try {
      const { token } = getState().auth;
        console.log('Update Product Request:', productData);
      const response = await api.put(`/products/${productData._id}`, productData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateProductSuccess(response.data));
      console.log('Update Product Response:', response.data); 
      
    } catch (error) {
      dispatch(updateProductFailure(error.message));
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'showProduct/fetchProduct',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      console.log(token,'fetch'); // Log the token value
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  product: [],
  loading: false,
  error: null,
};

const showProductSlice = createSlice({
  name: 'showProduct',
  initialState,
  reducers: {
    deleteProductSuccess: (state, action) => {
      state.product = state.product.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductSuccess: (state, action) => {
        console.log('updateProductSuccess reducer called');
        const updatedProductIndex = state.product.findIndex(
          (product) => product._id === action.payload._id
        );
        if (updatedProductIndex !== -1) {
          state.product[updatedProductIndex] = { ...state.product[updatedProductIndex], ...action.payload };
        }
        state.loading = false;
        state.error = null;
      },
      
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = [];
      });
  },
});

export const {
  deleteProductSuccess,
  deleteProductFailure,
  updateProductSuccess,
  updateProductFailure,
} = showProductSlice.actions;
export default showProductSlice.reducer;
