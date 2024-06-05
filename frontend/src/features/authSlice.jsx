import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  user: null,
  isLoading: false,
  userId: null,
  forgetPasswordEmail: null,
  resetPassword: null,
  validateToken: null,
};

//API URL
const signupUrl = "/api/users/signup";
const loginUrl = "/api/users/login";
const logoutUrl = "/api/users/logout";
const verifyOtpUrl = "/api/users/verifyOtp";
const sendResetPasswordOTPUrl = "/api/users/sendResetPasswordOTP";
const updatePasswordUrl = "/api/users/updatePassword";
const userSession = "/api/users/persistUserSession";

// Register Function
export const createuserAsync = createAsyncThunk(
  "user/create",
  async (formData) => {
    try {
      const response = await axios.post(signupUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// Login Function
export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (formData) => {
    try {
      const response = await axios.post(loginUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// sendOtp
export const sendOtpAsync = createAsyncThunk(
  "user/serndOtp",
  async (formData) => {
    try {
      const response = await axios.post(sendResetPasswordOTPUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// verifyOtp
export const verifyOtpAsync = createAsyncThunk(
  "user/verifyOtp",
  async (formData) => {
    try {
      const response = await axios.post(verifyOtpUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// RESET ASYNC THUNK
export const resetPassAsync = createAsyncThunk(
  "user/reset",
  async ({ id, resetPassword }) => {
    try {
      const response = await axios.post(updatePasswordUrl, {
        id,
        resetPassword,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// Logout Function
export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.delete(logoutUrl);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
});

// User Session Function
export const userSessionAsync = createAsyncThunk(
  "user/userSession",
  async () => {
    try {
      const response = await axios.get(userSession);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // signup
      .addCase(createuserAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createuserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      // logout
      .addCase(logoutUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
      })

      // Login
      .addCase(loginUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      // User Session
      .addCase(userSessionAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userSessionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      // FORGET PASSWORD ADD CASE
      .addCase(sendOtpAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendOtpAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload.userId;
      });
  },
});

export default authSlice.reducer;
