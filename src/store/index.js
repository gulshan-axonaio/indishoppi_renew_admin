import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducers.js";
const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export default store;
