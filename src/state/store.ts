import { configureStore } from "@reduxjs/toolkit";
import { reducerCell } from "./features/cellReducer";
import { bundleReducer } from "./features/bundleReducer";

export const store = configureStore({
  reducer: {
    cells: reducerCell,
    bundle: bundleReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});


export type RootState = ReturnType<typeof store.getState>
