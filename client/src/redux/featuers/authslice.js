import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../api'

export const signin = createAsyncThunk("auth/signin",
  async ({formValue, toast, navigate}, {rejectedWithValue}) => {
    try {
      const response = await api.signIn(formValue)
      toast.success("Login Successfully")
      navigate("/")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

export const register = createAsyncThunk("auth/register",
  async ({formValue, toast, navigate}, {rejectedWithValue}) => {
    try {
      const response = await api.signUp(formValue)
      toast.success("Register Successfully")
      navigate("/")
      return response.data
    } catch (err) {
      return rejectedWithValue(err.response.data)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state, action) => {
      localStorage.clear()
      state.user = null
    }
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.loading = true
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("profile", JSON.stringify({...action.payload}))
      state.user = action.payload
    },
    [signin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("profile", JSON.stringify({...action.payload}))
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message;
    },
  }
})

export const {setUser, setLogout} = authSlice.actions;
export default authSlice.reducer;