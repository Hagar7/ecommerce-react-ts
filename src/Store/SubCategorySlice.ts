import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SubCategory,
  SubCategoryResponse,
  SubCatgoryDetails,
} from "../Interfaces/SubCategoryInterface";

interface SubCategoryState {
  loading: boolean;
  error: string | undefined;
  subCategories: SubCategory[];
  subCategory: SubCategory | null;
}

const initialState: SubCategoryState = {
  loading: false,
  error: "",
  subCategories: [],
  subCategory: null,
};

export const getSubCategory = createAsyncThunk(
  "getSubCategory",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<SubCategoryResponse>(
        "https://route-ecommerce.onrender.com/api/v1/subcategories"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSubCategoryById = createAsyncThunk(
  "getSubCategoryById",
  async (_id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<SubCatgoryDetails>(
        `https://route-ecommerce.onrender.com/api/v1/subcategories/${_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSubCategoriesByCategory = createAsyncThunk(
  "getSubCategoriesByCategory",
  async (_id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get<SubCategoryResponse>(
        `https://route-ecommerce.onrender.com/api/v1/categories/${_id}/subcategories`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubCategory.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
      state.subCategories = action.payload.data;
    });
    builder.addCase(getSubCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSubCategoryById.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSubCategoryById.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
      state.subCategory = action.payload.data;
    });
    builder.addCase(getSubCategoryById.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
    builder.addCase(getSubCategoriesByCategory.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSubCategoriesByCategory.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
      state.subCategories = action.payload.data;
    });
    builder.addCase(getSubCategoriesByCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});

export default subCategorySlice.reducer;
