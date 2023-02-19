import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const adminSignin = createAsyncThunk(
  'admin/signin',
  async ({ formValue, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.adminLogin(formValue);
      toast.success('Admin Login Successfully');
      navigate('/admin/products');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const adminSignup = createAsyncThunk(
  'admin/signup',
  async ({ formValue, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.adminSignup(formValue);
      toast.success('Admin SignUp Successfully');
      navigate('/admin/products');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
    error: '',
    loading: false,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setAdminLogout: (state, action) => {
      localStorage.clear();
      state.admin = null;
    },
  },
  extraReducers: {
    [adminSignin.pending]: (state, action) => {
      state.loading = true;
    },
    [adminSignin.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        'adminProfile',
        JSON.stringify({ ...action.payload })
      );
      state.admin = action.payload;
    },
    [adminSignin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //
    [adminSignup.pending]: (state, action) => {
      state.loading = true;
    },
    [adminSignup.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        'adminProfile',
        JSON.stringify({ ...action.payload })
      );
      state.admin = action.payload;
    },
    [adminSignup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setAdmin, setAdminLogout } = adminSlice.actions;
export default adminSlice.reducer;
