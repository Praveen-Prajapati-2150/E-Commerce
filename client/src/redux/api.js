import axios from 'axios'
import category from "../components/Category";

const API = axios.create({
  baseURL: "http://localhost:5000",
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req
})


export const signIn = (formValue) => API.post("/users/signin", formValue)
export const signUp = (formValue) => API.post("/users/signup", formValue)
// export const getProductsBySearch = (searchQuery) => API.get(`/product/search?searchQuery=${searchQuery}`)
export const getProductsBySearch = (params) => API.get(`/product/search/${params}`)
export const getRelatedProducts = (category) => API.get(`/product/relatedProducts/${category}`, )

export const getProducts = () => API.get(`/product`)
export const getProduct = (id) => API.get(`product/${id}`)
export const createProduct = (formValue) => API.post("/product", formValue, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})
export const getProductsByUser = (userId) => API.get(`/product/userProducts/${userId}`)
export const updateProduct = ({id, formValue}) => API.patch(`/product/${id}`, formValue, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})
export const deleteProduct = (productId) => API.delete(`/product/${productId}`)

export const addToCart = ({userId,productDetails}) => API.post(`/cart/addToCart/${userId}`, productDetails)

