import axios from 'axios'

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

export const getProducts = (type) => API.get(`/product/${type}`)
export const createProduct = (formValue) => API.post("/product", formValue, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
},)

// axios.post("/path/to/api", data, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });