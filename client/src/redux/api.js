import axios from 'axios';

const dotEnv = process.env.NODE_ENV !== 'production';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('dotEnv', dotEnv);

const { REACT_APP_DEV_URL, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${dotEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const signIn = (formValue) => API.post('/users/signin', formValue);
export const signUp = (formValue) => API.post('/users/signup', formValue);
//
export const adminLogin = (formValue) => API.post('/admin/signin', formValue);
export const adminSignup = (formValue) => API.post('/admin/signup', formValue);
// export const getProductsBySearch = (searchQuery) => API.get(`/product/search?searchQuery=${searchQuery}`)
export const getProductsBySearch = (params) =>
  API.get(`/product/search/${params}`);
export const getRelatedProducts = (category) =>
  API.get(`/product/relatedProducts/${category}`);

export const getProducts = () => API.get(`/product`);
export const getProduct = (id) => API.get(`product/${id}`);
export const createProduct = (formValue) =>
  API.post('/product', formValue, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const getProductsByUser = (adminId) =>
  API.get(`/product/userProducts/${adminId}`);
export const updateProduct = ({ id, formValue }) =>
  API.patch(`/product/${id}`, formValue, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteProduct = (productId) => API.delete(`/product/${productId}`);

export const addToCart = ({ userId, productDetails }) =>
  API.post(`/cart/addToCart/${userId}`, productDetails);

export const getCategoryRelatedProducts = ({ category }) =>
  API.get(`/product/category/${category}`);
