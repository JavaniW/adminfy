import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Teacher } from "../../models/Teacher";

interface TeachersState {
  teachers: Teacher[];
}

const initialState: TeachersState = { teachers: [] };

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    FETCH_TEACHERS: (state, action: PayloadAction<Teacher[]>) => {
      state.teachers = action.payload;
    },
    CREATE_TEACHER: (state, action: PayloadAction<Teacher>) => {
      state.teachers.push(action.payload);
    },
    UPDATE_TEACHER: (state, action: PayloadAction<Teacher>) => {
      const idx = state.teachers.findIndex((x) => x._id === action.payload._id);
      state.teachers[idx] = { ...state.teachers[idx], ...action.payload };
    },
    DELETE_TEACHER: (state, action: PayloadAction<string | number>) => {
      state.teachers.filter((x) => x._id !== action.payload);
    },
  },
});

export const { CREATE_TEACHER, UPDATE_TEACHER, DELETE_TEACHER } =
  teachersSlice.actions;
export default teachersSlice.reducer;
