import {configureStore} from "@reduxjs/toolkit";
import authReducer from './featuers/authslice'
import productReducer from './featuers/productSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  }
})