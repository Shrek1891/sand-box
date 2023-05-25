import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bundle from "../../helpers/bundle";
import { Cell } from "../cell";

interface BundlesState {
  data: {
    [key: string]: {
      loading: boolean;
      error: string | null;
      code: string;
    };
  };
}

export const createBundle = createAsyncThunk(
  "@bundle/load",
  async (cell: Cell) => {
    const res = await bundle(cell.content);
    return { cellId: cell.id, res };
  }
);


const initialState: BundlesState = {
  data: {}
};

const reducer = createSlice({
  name: "@bundle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBundle.pending, (state, action) => {
        if (action.payload) {
          // @ts-ignore
          state[action.payload.cellId] = {
            loading: true,
            code: "",
            err: ""
          };
        }
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        // @ts-ignore
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.res.code,
          err: action.payload.res.err
        };
      });
  }
});

export const bundleReducer = reducer.reducer;
