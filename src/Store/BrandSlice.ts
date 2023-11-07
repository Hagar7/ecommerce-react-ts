import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Brand } from "../Interfaces/productsInterface";
import axios from "axios";
import { BrandDetails, BrandInterface } from "../Interfaces/brandInterface";

interface BranState {
  loading: boolean;
  error: string | undefined;
  brands: Brand[];
  brand: Brand | null
}

const initialState: BranState = {
  loading: false,
  error: "",
  brands: [],
  brand:null
};

export const getBrands = createAsyncThunk(
  "getBrands/brand",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<BrandInterface>(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBrandById = createAsyncThunk(
  "getBrandById/brand",
  async (_id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<BrandDetails>(
        `https://ecommerce.routemisr.com/api/v1/brands/${_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.brands = action.payload.data;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBrandById.pending,(state,action)=>{
      state.loading = true
      state.error=""
    })
    builder.addCase(getBrandById.fulfilled,(state,action)=>{
      state.loading = false
      state.error = "";
      state.brand = action.payload.data
    })
    builder.addCase(getBrandById.rejected,(state,action)=>{
    state.loading = false
    state.error = action.error.message;
    })
  },
});

export default brandSlice.reducer;
