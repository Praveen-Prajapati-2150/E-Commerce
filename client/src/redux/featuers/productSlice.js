import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../api'

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (page, {rejectedWithValue}) => {
    try {
      const response = await api.getProducts()
      return response.data;
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const createProduct = createAsyncThunk("product/createProduct",
  async ({formValue, toast, navigate}, {rejectedWithValue}) => {
    try {
      const response = await api.createProduct(formValue)
      toast.success("Product Created successfully")
      navigate("/")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)


const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },
    [createProduct.pending]: (state, action) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false
      console.log(action.payload)
      state.products = [action.payload]
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    }
  }
})

export default productSlice.reducer