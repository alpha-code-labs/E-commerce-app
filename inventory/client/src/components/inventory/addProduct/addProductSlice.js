import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/api';

// Create an async thunk for posting the product data
export const postProduct = createAsyncThunk(
  'products/postProduct',
  
  async (productData) => {
    try{const response = await api.post('/create', productData);
    return response.data;}catch(error){
      console.error(error)

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


// Rest of the code...
