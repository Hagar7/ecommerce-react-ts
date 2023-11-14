import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartInterface } from "../Interfaces/cartInterface";

interface InitialState {
  cart: CartInterface | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: InitialState = {
  cart: null,
  loading: false,
  error: "",
};

export const addProductToCart = createAsyncThunk(
  "addProductToCart/cart",
  async (productId: string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post<CartInterface>(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        productId,
        {
        headers: { token: localStorage.getItem("token") } }
      );
      console.log(productId);  
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.pending, (state, action) => {
      state.loading = true;
      state.error = ""; 
      
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      console.log(action.payload);
      state.cart = action.payload;
      console.log("full");
      
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;
