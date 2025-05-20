import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const sub_Category_add = createAsyncThunk(
  "subcategory/sub_category_add",
  async (
    { name, image, categoryId, productType },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = {
        categoryId: categoryId,
        name: name,
        image: image,
        productType: productType,
      };
      const { data } = await api.post("sub-category-add", formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const sub_category_update = createAsyncThunk(
//   "subcategory/sub-category-update",
//   async (
//     id,
//     name,
//     image,
//     categoryId,
//     { rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append("id", id);
//       formData.append("name", name);
//       if (image instanceof File) {
//         formData.append("image", image);
//       }
//       const { data } = await api.post("/sub-category-update", formData, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const sub_category_update = createAsyncThunk(
  "subcategory/sub-category-update",
  async (
    { name, image, categoryId, id, productType },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = {
        categoryId: categoryId,
        subCategoryId: id,
        name: name,
        image: image,
        productType: productType,
      };
      console.log("formData", formData);

      const { data } = await api.post("/sub-category-update", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_sub_category = createAsyncThunk(
  "subcategory/get_sub_category",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/sub_category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_sub_category = createAsyncThunk(
  "subcategory/delete_sub_category",
  async (subCategoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/sub-category-delete/${subCategoryId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const sub_category_image_update = createAsyncThunk(
//   "subcategory/sub_category_image_update",
//   async (
//     { oldImage, newImage, subCategoryId },
//     { rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append("oldImage", oldImage);
//       formData.append("newImage", newImage);
//       formData.append("categoryId", subCategoryId);
//       const { data } = await api.post("/sub-category-image-update", formData, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const get_one_sub_category = createAsyncThunk(
  "subcategory/get-one-subCategory",
  async (subCategoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-one-subCategor/${subCategoryId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_sub_cat_by_category = createAsyncThunk(
  "subcategory/get_sub_cat_by_category",
  async ({ categoryId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `get_sub_cat_by_category/${categoryId}`,

        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const subCategoryReducer = createSlice({
  name: "subcategory",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    subCategorys: [],
    totalsubCategory: 0,
    specificSubCategory: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_sub_cat_by_category.fulfilled]: (state, { payload }) => {
      state.specificSubCategory = payload.specificSubCategory;
    },
    [sub_Category_add.pending]: (state, _) => {
      state.loader = true;
    },
    [sub_Category_add.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [sub_Category_add.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.subCategorys = [...state.subCategorys, payload.subCategory];
    },
    [get_sub_category.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      state.totalSubCategory = payload.totalSubCategory;
      state.subCategorys = payload.subCategorys;
    },
    [get_one_sub_category.fulfilled]: (state, { payload }) => {
      state.singleSubcategory = payload.singleSubCategory;
      state.subCategories = payload.subCategories;
    },
    [sub_category_update.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;

      if (payload.subCategory) {
        state.subCategorys = state.subCategorys.map((subcategory) =>
          subcategory._id === payload.subCategory._id
            ? payload.subCategory
            : subcategory
        );
      } else {
        console.error("subCategory is missing in API response:", payload);
      }
    },
    // [sub_category_image_update.fulfilled]: (state, { payload }) => {
    //   state.subCategorys = payload.subCategorys;
    //   state.successMessage = payload.message;
    // },
    [delete_sub_category.fulfilled]: (state, { payload }) => {
      state.subCategorys = state.subCategorys.filter(
        (item, idx) => item._id != payload.subCategoryId
      );
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = subCategoryReducer.actions;
export default subCategoryReducer.reducer;
