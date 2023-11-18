import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authUser,
  loginUser,
  registerResponse,
  registerUser,
} from "../Interfaces/authInterface";
import axios from "axios";
import Swal from "sweetalert2";
import storage from "redux-persist/lib/storage";


const Toast = Swal.mixin({
  toast: true,
  position: "center-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const goToLogin = () => {
  window.location.href = "/login";
};

const goToHome = () => {
  window.location.href = "/";
};
export interface StateInterface {
  loading: boolean;
  error: string | undefined;
  authUser: authUser | null;
}

const initialState: StateInterface = {
  loading: false,
  error: "",
  authUser: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (formData: registerUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post<registerResponse>(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        formData
      );
      return data;
    } catch (error) {      
      Toast.fire({
        icon: "error",
        title: "email is already registered",
      });
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: loginUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post<registerResponse>(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        userData
      );
      console.log(data, "login");
      const { message, token } = data;
      if (message === "success") {
        localStorage.setItem("token", `${token}`);
        Toast.fire({
          icon: "success",
          title: "login successfully",
        });
      }
      goToHome();
      return data;
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Incorrect email or password",
      });
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      storage.removeItem("root");
      localStorage.removeItem("token");
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      if (action.payload.message === "success") {
        Toast.fire({
          icon: "success",
          title: "User Added successfully",
        });
      }
      goToLogin();
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.authUser = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;
