import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import SearchFilter from "../../views/admin/SearchFilter";

export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const push_order_to_shiprocket = createAsyncThunk(
  "order/push_order_to_shiprocket",
  async ({ orderId, pickupData }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = {
        orderId: orderId,
        pickupData: pickupData,
      };
      const { data } = await api.post(
        "/seller/push-order-to-shiprocket",
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

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/seller/orders/?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_all_pickup_location = createAsyncThunk(
  "order/get_seller_all_pickup_location",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/orders/get-seller-all-pickup-location`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const get_seller_pickuplocation = createAsyncThunk(
  "order/get_seller_pickuplocation",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/seller/get-pickuplocation/?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_get_seller_pickuplocation = createAsyncThunk(
  "order/admin_get_seller_pickuplocation",
  async (
    { parPage, page, searchValue, valueName },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/admin/get-pickup-location/?valueName=${valueName}&page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_order = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_order = createAsyncThunk(
  "order/get_seller_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/order-status/update/${orderId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_order_status_update = createAsyncThunk(
  "order/seller_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/seller/order-status/update/${orderId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_get_productType = createAsyncThunk(
  "order/admin_get_productType",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/admin/admin-get-productType/?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_get_searchFilter = createAsyncThunk(
  "order/admin_get_searchFilter",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/admin/get-search-filter/?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const OrderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    totalPickupLocation: 0,
    order: {},
    myOrders: [],
    sellerAllPL: [],
    myPickupLocation: [],
    srOrder: {},
    totalProductType: 0,
    productType: [],
    SearchFilter: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [admin_get_productType.fulfilled]: (state, { payload }) => {
      state.totalProductType = payload.totalProductType;
      state.productType = payload.productType;
    },
    [admin_get_searchFilter.fulfilled]: (state, { payload }) => {
      state.SearchFilter = payload.SearchFilter;
    },
    [push_order_to_shiprocket.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.srOrder = payload.shiprocketOrderResponse;
      state.successMessage = payload.message;
    },
    [push_order_to_shiprocket.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [get_admin_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrder;
    },
    [get_admin_order.fulfilled]: (state, { payload }) => {
      state.order = payload.order;
    },
    [admin_order_status_update.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },
    [admin_order_status_update.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_seller_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrder;
    },
    [get_seller_order.fulfilled]: (state, { payload }) => {
      state.order = payload.order;
    },

    [get_seller_all_pickup_location.fulfilled]: (state, { payload }) => {
      state.sellerAllPL = payload.sellerAllPL;
    },
    [get_seller_all_pickup_location.fulfilled]: (state, { payload }) => {
      state.sellerAllPL = payload.sellerAllPL;
    },

    [get_seller_pickuplocation.fulfilled]: (state, { payload }) => {
      state.myPickupLocation = payload.pickupLocation;
      state.totalPickupLocation = payload.totalPickupLocation;
    },
    [get_seller_pickuplocation.fulfilled]: (state, { payload }) => {
      state.myPickupLocation = payload.pickupLocation;
    },

    [admin_get_seller_pickuplocation.fulfilled]: (state, { payload }) => {
      state.myPickupLocation = payload.pickupLocation;
      state.totalPickupLocation = payload.totalPickupLocation;
    },
    [admin_get_seller_pickuplocation.fulfilled]: (state, { payload }) => {
      state.myPickupLocation = payload.pickupLocation;
    },
    [seller_order_status_update.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },
    [seller_order_status_update.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = OrderReducer.actions;
export default OrderReducer.reducer;
