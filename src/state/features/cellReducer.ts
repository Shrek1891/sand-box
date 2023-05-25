import { Cell } from "../cell";
import { createAsyncThunk, createSlice, current, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};


export const fetchCells = createAsyncThunk(
  "@cell/fetch",
  async () => {
    const { data }: { data: Cell[] } = await axios.get("/cells");
    return data;
  }
);


const reducer = createSlice({
  name: "@cell",
  initialState,
  reducers: {
    move_cell: (state: CellsState, action) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((id) => {
        return id === action.payload.id;
      });
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

    },
    delete_cell: (state: CellsState, action) => {
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);
    },
    insertCellBefore: (state, action) => {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId()
      };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex(id => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }
    },
    update_cell: (state, action) => {
      const { id, value } = action.payload;
      state.data[id].content = value;

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCells.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCells.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(fetchCells.fulfilled, (state, action) => {
        state.order = action.payload.map(cell => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState["data"]);
      });
  }

});
const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export const reducerCell = reducer.reducer;
export const { move_cell, delete_cell, update_cell, insertCellBefore } = reducer.actions;