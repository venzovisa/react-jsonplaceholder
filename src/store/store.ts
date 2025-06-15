import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });

export type RootState = ReturnType<typeof apiSlice.reducer>;
export type AppStore = ReturnType<typeof setupStore>;
