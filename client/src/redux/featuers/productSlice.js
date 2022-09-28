import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../api'

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, {rejectedWithValue}) => {
    try {
      const response = await api.getProducts()
      return response.data;
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)


export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, {rejectedWithValue}) => {
    try {
      const response = await api.getProduct(id)
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const createProduct = createAsyncThunk("product/createProduct",
  async ({formValue, toast, navigate}, {rejectedWithValue}) => {
    console.log("formValue", formValue)
    try {
      const response = await api.createProduct(formValue)
      toast.success("Product Created successfully")
      navigate("/dashboard")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const getProductsByUser = createAsyncThunk("product/getProductsByUser",
  async ({userId, toast}, {rejectedWithValue}) => {
    try {
      const response = await api.getProductsByUser(userId)
      toast.success("Products Fetched successfully")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const updateProduct = createAsyncThunk("product/updateProduct",
  async ({id, formValue, toast, navigate}, {rejectedWithValue}) => {
    try {
      const response = await api.updateProduct({id, formValue})
      toast.success("Product Updated Successfully")
      navigate("/dashboard")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const deleteProduct = createAsyncThunk("product/deleteProduct",
  async ({id, toast}, {rejectedWithValue}) => {
    try {
      const response = await api.deleteProduct(id)
      toast.success("Product Deleted Successfully")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const getProductsBySearch = createAsyncThunk("product/getProductsBySearch",
  async ({searchQuery, navigate}, {rejectedWithValue}) => {
    try {
      const response = await api.getProductsBySearch(searchQuery)
      // navigate(`/product/search/${searchQuery}`)
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const getRelatedProducts = createAsyncThunk("product/getRelatedProducts",
  async (category, {rejectedWithValue}) => {
    console.log({category})
    try {
      const response = await api.getRelatedProducts(category)
      console.log(response)
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)


const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    userProducts: [],
    relatedProducts: [],
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

    [getProduct.pending]: (state, action) => {
      state.loading = true
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },

    [createProduct.pending]: (state, action) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.products = [action.payload]
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },

    [getProductsByUser.pending]: (state, action) => {
      state.loading = true
    },
    [getProductsByUser.fulfilled]: (state, action) => {
      state.loading = false
      state.userProducts = action.payload
    },
    [getProductsByUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },

    [deleteProduct.pending]: (state, action) => {
      state.loading = true
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false
      // state.userProducts = action.payload
      const {arg: {id}} = action.meta;
      if (id) {
        state.userProducts = state.userProducts.filter((product) => product._id !== id)
        state.products = state.products.filter((product) => product._id !== id)
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },

    [getProductsBySearch.pending]: (state, action) => {
      state.loading = true
    },
    [getProductsBySearch.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [getProductsBySearch.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },

    [getRelatedProducts.pending]: (state, action) => {
      state.loading = true
    },
    [getRelatedProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.relatedProducts = action.payload.filter((product) => product._id !== state.product._id)
    },
    [getRelatedProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message()
    },

  }
})

export default productSlice.reducer