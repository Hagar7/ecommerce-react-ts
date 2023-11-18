import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartInterface } from "../Interfaces/cartInterface";
import { UserCartInterface } from "../Interfaces/GetCartInterface";

interface InitialState {
  cart: UserCartInterface | null;
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
  async (productId: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post<CartInterface>(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "getUserCart/cart",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<UserCartInterface>(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeItem = createAsyncThunk(
  "removeItem/cart",
  async (_id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.delete<UserCartInterface>(
        `https://ecommerce.routemisr.com/api/v1/cart/${_id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      return _id;
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
    // add to cart
    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // get cart information
    builder.addCase(getUserCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cart = action.payload;
    });
    builder.addCase(getUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //remove item from cart
    builder.addCase(removeItem.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cart = state.cart
        ? {
            ...state.cart,
            data: {
              ...state.cart.data,
              products: state.cart.data.products.filter(
                (item) => item._id !== action.payload
              ),
            },
          }
        : null;
      console.log(state.cart);
    });
    builder.addCase(removeItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;
