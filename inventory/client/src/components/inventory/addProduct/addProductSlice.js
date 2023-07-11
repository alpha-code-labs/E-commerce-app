import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/api';

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (productData, { getState }) => {
    try {
      const { token } = getState().auth;
      console.log(token,'from slicer');

      // Include the token in the request headers
      const response = await api.post('/create', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);



// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
