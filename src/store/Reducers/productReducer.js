import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(product);
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/updateProduct",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    // console.log("product", product);
    try {
      const { data } = await api.post("/product-update", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product_varient = createAsyncThunk(
  "product/update_product_varient",
  async (varientData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-varient-update", varientData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = {
        oldImage: oldImage,
        newImage: newImage,
        productId: productId,
      };

      const { data } = await api.post("/product-image-update", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const product_varient_image_update = createAsyncThunk(
  "product/product_varient_image_update",
  async (
    { oldImage, newImage, varientId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = {
        oldImage: oldImage,
        newImage: newImage,
        varientId: varientId,
      };

      const { data } = await api.post(
        "/product_varient_image_update",
        formData,
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

export const get_products = createAsyncThunk(
  "product/get_products",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_pickup_location = createAsyncThunk(
  "product/get_pickup_location",
  async (locationId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-pickup-location/${locationId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_product = createAsyncThunk(
  "product/delete_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/product-delete/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_product_variant = createAsyncThunk(
  "product/add_product_variant",
  async (datax, { rejectWithValue, fulfillWithValue }) => {
    console.log("datax==>", datax.varientData);

    try {
      console.log(datax);
      const { data } = await api.post(`/product/variants`, datax.varientData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetch_variant_details = createAsyncThunk(
  "product/fetch_variant_details",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product/variants/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    pickup_locaton: "",
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [add_product_variant.pending]: (state, _) => {
      state.loader = true;
    },
    [add_product_variant.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [add_product_variant.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },

    [fetch_variant_details.pending]: (state, _) => {
      state.loader = true;
    },
    [fetch_variant_details.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [fetch_variant_details.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.product = payload.data;
      state.successMessage = payload.message;
    },

    [add_product.pending]: (state, _) => {
      state.loader = true;
    },
    [add_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [add_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.totalProduct = payload.totalProduct;
      state.products = payload.products;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
    },
    [get_pickup_location.fulfilled]: (state, { payload }) => {
      state.pickup_locaton = payload.pickup_locaton;
    },
    [update_product.pending]: (state, _) => {
      state.loader = true;
    },
    [update_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [update_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.product = payload.product;
      state.successMessage = payload.message;
    },

    [update_product_varient.pending]: (state, _) => {
      state.loader = true;
    },
    [update_product_varient.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [update_product_varient.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.varient = payload.varient;
      state.successMessage = payload.message;
    },
    [product_image_update.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
      state.successMessage = payload.message;
    },
    [product_varient_image_update.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
      state.successMessage = payload.message;
    },
    [delete_product.fulfilled]: (state, { payload }) => {
      state.products = state.products.filter(
        (item, idx) => item._id != payload.productId
      );
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
