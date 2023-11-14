import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryDetails,
  CategoryInterface,
} from "../Interfaces/CategoriesInterface";
import axios from "axios";

interface StateInterface {
  loading: boolean;
  error: string | undefined;
  categories: Category[];
  category: Category | null;
}

const initialState: StateInterface = {
  loading: false,
  error: "",
  categories: [],
  category: null,
};

export const getCategories = createAsyncThunk(
  "get/categories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<CategoryInterface>(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "getCategoryById/categories",
  async (_id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<CategoryDetails>(
        `https://ecommerce.routemisr.com/api/v1/categories/${_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.categories = action.payload.data;
    });
    builder.addCase(getCategories.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCategoryById.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.category = action.payload.data;
    
      
    });
    builder.addCase(getCategoryById.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
