import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const addProductToCart = createAsyncThunk("product/addProductToCart",
  async ({userId, productDetails, toast}, {rejectedWithValue}) => {
    console.log("cartSlice", productDetails)
    try {
      const response = await api.addToCart({userId, productDetails})
      toast.success("Product added to cart")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    error: "",
    loading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart){
        itemInCart.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload)
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload)
      if (item.quantity === 1){
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    }
  },
  extraReducers: {
    [addProductToCart.pending]: (state, action) => {
      state.loading = true
    },
    [addProductToCart.fulfilled]: (state, action) => {
      state.loading = false
      state.cart = action.payload
    },
    [addProductToCart.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
})

export default cartSlice.reducer

export const {addToCart, incrementQuantity, decrementQuantity, removeItem} = cartSlice.actions;