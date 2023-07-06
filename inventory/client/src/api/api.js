import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'http://localhost:9001/api', // Replace with your base URL
  // You can also include other common configurations here, such as headers
});

export default baseURL;




// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:9002/api',
// });

// export const productAPI = {
//     createProduct: (productData) => api.post('/create', productData),
//   getAllProducts: () => api.get('/products'),
//   getProductById: (productId) => api.get(`/products/${productId}`),
//   updateProduct: (productId, productData) =>
//     api.put(`/products/${productId}`, productData),
//   deleteProduct: (productId) => api.delete(`/products/${productId}`),
// };

// export default api;
