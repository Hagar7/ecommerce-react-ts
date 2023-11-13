import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Product,
  ProductDetails,
  ProductsResponse,
} from "../Interfaces/productsInterface";

interface ProductState {
  loading: boolean;
  error: string | undefined;
  products: Product[];
  product: Product | null;
  productsFiltered: Product[];
}

const initialState: ProductState = {
  loading: false,
  error: "",
  products: [],
  product: null,
  productsFiltered: [],
};

export const getProducts = createAsyncThunk(
  "get/products",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<ProductsResponse>(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "getById/products",
  async (_id: string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<ProductDetails>(
        `https://ecommerce.routemisr.com/api/v1/products/${_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    categoryFiltered: (state, action) => {
      state.productsFiltered = state.products.filter(
        (item) => item.category.name === action.payload
      );
    },
    brandFiltered: (state, action) => {
      state.productsFiltered = state.products.filter(
        (item) => item.brand.name === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProducts.fulfilled, (state, acttion) => {
      state.loading = true;
      state.error = "";
      state.products = acttion.payload.data;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
      state.product = action.payload.data;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
export const { categoryFiltered, brandFiltered } = productSlice.actions;
